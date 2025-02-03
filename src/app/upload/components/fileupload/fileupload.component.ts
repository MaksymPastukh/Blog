import {Component, OnInit} from '@angular/core'
import {MessageService} from 'primeng/api'
import {select, Store} from '@ngrx/store'
import {FileUpload, FileUploadModule} from 'primeng/fileupload'
import {Toast, ToastModule} from 'primeng/toast'
import {catchError, fromEvent, map, of, Subscription, switchMap, tap, throwError} from 'rxjs'
import {D3Component} from '../d3/d3.component'
import {ChartActions, loadChartData, loadChartDataSuccess} from '../../store/actions/data.action'
import {ChartState} from '../../types/chart.interface'
import {NgForOf, NgIf} from '@angular/common'
import {ChartData} from '../../types/data.interface'

@Component({
  selector: 'app-file-upload',
  templateUrl: './fileupload.component.html',
  // Импортируем необходимые модули и компоненты для работы компонента
  imports: [
    FileUpload,   // Компонент для загрузки файлов от PrimeNG
    Toast,        // Компонент для отображения уведомлений (toast)
    FileUploadModule,
    ToastModule,
    D3Component,
    NgForOf,
    NgIf
  ],
  providers: [MessageService]  // Предоставляем сервис для отображения уведомлений
})
export class FileUploadComponent implements OnInit {
  // Массив для хранения загруженных файлов
  files: ChartData[] | null = null // Храним загруженные файлы

  constructor(
    public messageService: MessageService,  // Сервис для уведомлений
    public store: Store<ChartState> // NgRx Store, в котором хранятся данные (предполагается, что данные типа DataItem[])
  ) {
  }

  ngOnInit() {
    // Инициализация компонента, дополнительных действий не требуется
    this.store.dispatch(loadChartData())


  }

  onChildNotify(data: ChartData[]): void {
    this.files = data
    console.log(this.files)
  }

  removeFile(fileId: string) {
    this.files = this.files.filter(file => file.id !== fileId)
    // this.store.dispatch(ChartActions.loadChartDataSuccess({ data: this.files }));
  }


  clearData() {
    this.store.dispatch(ChartActions.clearChartData())
    this.files = [] // Очищаем массив загруженных файлов
  }

  // Метод, вызываемый при загрузке файла (событие onUpload от p-fileupload)
  onUpload(event: any) {
    // Извлекаем первый файл из массива загруженных файлов
    const file = event.files[0]

    // Если файл не выбран, выводим ошибку и прекращаем выполнение
    if (!file) {
      this.showError('No file selected')
      return
    }

    // Проверяем, не превышает ли размер файла 5 МБ
    if (file.size > 5 * 1024 * 1024) {
      this.showError('File size exceeds 5MB')
      return
    }

    // Создаем экземпляр FileReader для чтения содержимого файла
    const reader = new FileReader()

    // Преобразуем событие загрузки (load) в поток RxJS с помощью fromEvent
    fromEvent(reader, 'load')
      .pipe(
        // Получаем результат чтения файла как строку
        map(() => reader.result as string),
        // Парсим строку в JSON-объект
        map(text => {
          try {
            return JSON.parse(text)
          } catch (e) {
            throw new Error('Invalid JSON')
          }
        }),
        map(data => ({
          id: `${Math.floor(Math.random() * 100001).toString()}`, // Уникальный ID файла
          name: file.name, // 🔥 Добавляем название файла
          size: file.size,
          timestamp: new Intl.DateTimeFormat('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }).format(new Date()), // Время загрузки файла
          data // Загружаемые данные остаются внутри data
        })),
        // Проверяем, что данные валидны. Если да, передаем данные дальше, иначе выбрасываем ошибку
        switchMap(data =>
          this.isValidData(data)
            ? of(data)
            : throwError(() => new Error('Invalid data format'))
        ),
        // Обработка ошибок, возникающих в цепочке RxJS
        catchError((err) => {
          this.showError(err.message)
          // Возвращаем null, чтобы завершить поток, не прерывая выполнение приложения
          return of(null)
        })
      ).subscribe(data => {
      // Если данные успешно получены и валидны
      if (data) {
        // Диспатчим экшен для сохранения данных в NgRx Store
        this.store.dispatch(loadChartDataSuccess({data: data}))
        // Выводим уведомление об успешной загрузке файла
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'File uploaded successfully'
        })
      }
    })

    // Начинаем чтение файла как текст
    reader.readAsText(file)
  }


  // Метод для вывода ошибки через MessageService
  private showError(detail: string) {
    this.messageService.add({
      severity: 'error', // Тип уведомления - ошибка
      summary: 'Error',  // Заголовок уведомления
      detail           // Текст ошибки
    })
  }

  // Метод для проверки валидности загруженных данных
  private isValidData(data: any): boolean {
    // Проверяем, что данные существуют и имеют тип "object"
    if (!data || typeof data !== 'object') {
      return false // Если данные не валидны, возвращаем false
    }
    return true // Если данные валидны, возвращаем true
  }

}
