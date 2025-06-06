import { Element_ } from '../../../../../Class/Element'
import { System } from '../../../../../system'
import { ID_ANIMATE_0 } from '../../../../_ids'
import { Attr } from '../../../Style'

export interface I {
  attr: Attr
  attributeName: string
  type: string
  from: string
  to: string
  dur: string
  repeatCount: string
}

export interface O {}

export default class SVGAnimate extends Element_<I, O> {
  constructor(system: System) {
    super(
      {
        i: ['attr', 'attributeName', 'from', 'to', 'dur', 'repeatCount'],
        o: [],
      },
      {},
      system,
      ID_ANIMATE_0
    )
  }
}
