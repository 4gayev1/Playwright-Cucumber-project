import { fixture } from "../../helper/imports/commons";

export class Elements {
  static elements = {};

  static addElements(elements: string) {
    this.elements = elements;
  }

  static getElement(element: string) {
    const selector = this.elements[element].selector || this.elements[element];
    const waitTime = this.elements[element].waitTime * 1000 || 0;
    return fixture.page.locator(selector);
  }
}

export const getElement = Elements.getElement.bind(Elements);
export const addElements = Elements.addElements.bind(Elements);
