import HTMLElement_ from '../../../../client/html'
import { System } from '../../../../system'
import { Dict } from '../../../../types/Dict'

export interface Props {
  style?: Dict<string>
  attr?: Dict<string>
}

export default class Header3 extends HTMLElement_<HTMLHeadingElement, Props> {
  constructor($props: Props, $system: System) {
    super(
      $props,
      $system,
      $system.api.document.createElement('h3'),
      $system.style['h3'],
      {},
      {}
    )
  }
}
