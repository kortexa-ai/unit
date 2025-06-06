import { Style } from '../system/platform/Style'
import { Dict } from '../types/Dict'
import { identity } from '../util/identity'
import { applyAttr } from './attr'
import { Component } from './component'
import { applyDynamicStyle, applyStyle } from './style'

export type Handler = (value: any, previous: any) => void

export type PropHandler = Dict<Handler>

export function makeAttrHandler(
  element: HTMLElement | SVGElement,
  name: string
): Handler {
  return (data: any) => {
    if (data === undefined) {
      element.removeAttribute(name)
    } else {
      element.setAttribute(name, data)
    }
  }
}

export function elementPropHandler<T extends HTMLElement | SVGElement>(
  component: Component<T>,
  element: T,
  DEFAULT_STYLE: Style,
  DEFAULT_ATTR: Dict<any>
): PropHandler {
  return {
    ...basePropHandler(component, element, DEFAULT_STYLE, DEFAULT_ATTR),
    ...stylePropHandler(component, element, DEFAULT_STYLE),
  }
}

export function htmlPropHandler<T extends HTMLElement>(
  component: Component<T>,
  element: T,
  DEFAULT_STYLE: Style,
  DEFAULT_ATTR: Dict<any>
): PropHandler {
  return {
    ...elementPropHandler(component, element, DEFAULT_STYLE, DEFAULT_ATTR),
    innerText: (innerText: string | undefined) => {
      element.innerText = innerText || ''
    },
  }
}

export function svgPropHandler<P extends Dict<any> = any>(
  component: Component<SVGElement, P>,
  element: SVGElement,
  DEFAULT_STYLE: Style,
  DEFAULT_ATTR: Dict<any>
): PropHandler {
  return {
    ...basePropHandler(component, element, DEFAULT_STYLE, DEFAULT_ATTR),
    ...stylePropHandler(component, element, DEFAULT_STYLE),
    ...{
      x: (
        x: number | undefined = component.$props.attr.x ?? DEFAULT_ATTR.x
      ) => {
        element.setAttribute('x', `${x}`)
      },
      y: (
        y: number | undefined = component.$props.attr.y ?? DEFAULT_ATTR.y
      ) => {
        element.setAttribute('y', `${y}`)
      },
      x1: (
        x1: number | undefined = component.$props.attr.x1 ?? DEFAULT_ATTR.x1
      ) => {
        element.setAttribute('x1', `${x1}`)
      },
      x2: (
        x2: number | undefined = component.$props.attr.x2 ?? DEFAULT_ATTR.x2
      ) => {
        element.setAttribute('x2', `${x2}`)
      },
      y1: (
        y1: number | undefined = component.$props.attr.y1 ?? DEFAULT_ATTR.y1
      ) => {
        element.setAttribute('y1', `${y1}`)
      },
      y2: (
        y2: number | undefined = component.$props.attr.y2 ?? DEFAULT_ATTR.y2
      ) => {
        element.setAttribute('y2', `${y2}`)
      },
      width: (
        width: number | undefined = component.$props.attr.width ??
          DEFAULT_ATTR.width
      ) => {
        element.setAttribute('width', `${width}`)
      },
      height: (
        height: number | undefined = component.$props.attr.height ??
          DEFAULT_ATTR.height
      ) => {
        element.setAttribute('height', `${height}`)
      },
      rx: (
        rx: number | undefined = component.$props.attr.rx ?? DEFAULT_ATTR.rx
      ) => {
        element.setAttribute('rx', `${rx}`)
      },
      ry: (
        ry: number | undefined = component.$props.attr.ry ?? DEFAULT_ATTR.ry
      ) => {
        element.setAttribute('ry', `${ry}`)
      },
      href: (
        href: number | undefined = component.$props.attr.href ??
          DEFAULT_ATTR.href
      ) => {
        element.setAttribute('href', `${href}`)
      },
    },
  }
}

export function basePropHandler(
  component: Component,
  element: HTMLElement | SVGElement,
  DEFAULT_STYLE: Style,
  DEFAULT_ATTR: Dict<any>
): PropHandler {
  return {
    attr: (attr, prev) => {
      applyAttr(element, { ...DEFAULT_ATTR, ...attr }, prev)
    },
    style: (style: Dict<string> | undefined = {}) => {
      applyStyle(element, { ...DEFAULT_STYLE, ...style })
    },
    name: makeAttrHandler(element, 'name'),
    className: makeAttrHandler(element, 'className'),
    id: makeAttrHandler(element, 'id'),
    tabIndex: makeAttrHandler(element, 'tabIndex'),
    title: makeAttrHandler(element, 'title'),
    draggable: makeAttrHandler(element, 'draggable'),
  }
}

export function stylePropHandler(
  component: Component<HTMLElement | SVGElement>,
  element: HTMLElement | SVGElement,
  DEFAULT_STYLE: Style
): PropHandler {
  return {
    style: (style: Dict<string> | undefined = {}) => {
      applyDynamicStyle(component, element, { ...DEFAULT_STYLE, ...style })
    },
  }
}

export function inputPropHandler(
  element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  VALUE_NAME: string,
  DEFAULT_VALUE: any,
  parseValue: (value: string) => string = identity
): PropHandler {
  return {
    value: (value: any | undefined) => {
      const value_ = parseValue(value)

      element[VALUE_NAME] = value_ || DEFAULT_VALUE
    },
    placeholder: (placeholder: string | undefined) => {
      // @ts-ignore
      element.placeholder = placeholder ?? ''
    },
    disabled: makeAttrHandler(element, 'disabled'),
  }
}
