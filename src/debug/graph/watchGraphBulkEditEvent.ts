import { Graph } from '../../Class/Graph'
import { Action } from '../../types/Action'
import { Moment } from '../Moment'

export interface GraphBulkEditMomentData {
  actions: Action[]
  path: string[]
}

export interface GraphBulkEditMoment extends Moment<GraphBulkEditMomentData> {}

export function watchGraphBulkEditEvent(
  event: 'bulk_edit',
  graph: Graph,
  callback: (moment) => void
): () => void {
  const listener = (actions: Action[], path: string[]) => {
    callback({
      type: 'graph',
      event,
      data: {
        actions,
        path,
      },
    })
  }

  graph.prependListener(event, listener)

  return () => {
    graph.removeListener(event, listener)
  }
}
