//
// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { of } from 'rxjs';
// import { catchError, map, mergeMap } from 'rxjs/operators';
// import {ChartActions} from '../actions/data.action'
// import {ConfigService} from '../../../shared/services/config.service'
//
// @Injectable()
// export class ChartEffects {
//   loadData$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(ChartActions.loadChartData),
//       mergeMap(() =>
//         this.configService.getApiUrl().pipe(
//           map(data => ChartActions.loadChartDataSuccess({ data })),
//           catchError(error => of(ChartActions.loadChartDataFailure({ error })))
//         )
//       )
//     )
//   );
//
//   constructor(
//     private actions$: Actions,
//     private configService: ConfigService
//   ) {}
// }
