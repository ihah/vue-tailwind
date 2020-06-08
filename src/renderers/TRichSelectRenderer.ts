import { CreateElement, VNode, VNodeChildren } from 'vue';
import TRichSelectInterface from '@/types/TRichSelect';
import NormalizedOptions from '@/types/NormalizedOptions';
import NormalizedOption from '@/types/NormalizedOption';

export default class TRichSelectRenderer {
  createElement: CreateElement

  component: TRichSelectInterface

  constructor(createElement: CreateElement, component: TRichSelectInterface) {
    this.createElement = createElement;
    this.component = component;
  }

  render(): VNode {
    return this.createWrapper();
  }

  /**
   * Div that wrapps the whole component
   */
  createWrapper() {
    return this.createElement(
      'div',
      {
        ref: 'wrapper',
        class: this.component.getElementCssClass('wrapper'),
      },
      [
        this.createSelectButtonWrapper(),
        this.createDropdown(),
      ],
    );
  }

  /**
   * Div that wraps the button that is used as a select box
   */
  createSelectButtonWrapper() {
    return this.createElement(
      'div',
      {
        ref: 'buttonWrapper',
        class: this.component.getElementCssClass('buttonWrapper'),
      },
      [
        this.createSelectButton(),
      ],
    );
  }

  /**
   * The button that is used a select box
   */
  createSelectButton() {
    const subElements = [];

    if (this.component.selectedOption) {
      subElements.push(this.createSelectButtonLabel());
    } else {
      subElements.push(this.createSelectButtonPlaceholder());
    }

    if (this.component.clearable && this.component.selectedOption && !this.component.disabled) {
      subElements.push(this.createSelectButtonClearIcon());
    } else {
      subElements.push(this.createSelectButtonIcon());
    }

    return this.createElement(
      'button',
      {
        ref: 'selectButton',
        attrs: {
          type: 'button',
          value: this.component.localValue,
          id: this.component.id,
          autofocus: this.component.autofocus,
          disabled: this.component.disabled,
          name: this.component.name,
        },
        class: this.component.getElementCssClass('selectButton'),
        on: {
          click: this.component.clickHandler,
          focus: this.component.focusHandler,
          keydown: (e: KeyboardEvent) => {
            // Down
            if (e.keyCode === 40) {
              this.component.arrowDownHandler(e);
            // Up
            } else if (e.keyCode === 38) {
              this.component.arrowUpHandler(e);
            // Enter
            } else if (e.keyCode === 13) {
              this.component.enterHandler(e);
            }
          },
          blur: (e: FocusEvent) => {
            if (!this.component.hideSearchBox) {
              return;
            }

            this.component.blurHandler(e);
          },
          mousedown: (e: MouseEvent) => {
            e.preventDefault();
          },
        },
      },
      subElements,
    );
  }

  createSelectButtonLabel(): VNode {
    return this.createElement(
      'span',
      {
        ref: 'selectButtonLabel',
        class: this.component.getElementCssClass('selectButtonLabel'),
      },
      (this.component.selectedOption ? this.component.selectedOption.text : '') as VNodeChildren,
    );
  }

  createSelectButtonPlaceholder(): VNode {
    const domProps: {innerHTML?: string} = {};
    if (!this.component.placeholder) {
      domProps.innerHTML = '&nbsp;';
    }
    return this.createElement(
      'span',
      {
        ref: 'selectButtonPlaceholder',
        class: this.component.getElementCssClass('selectButtonPlaceholder'),
        domProps,
      },
      this.component.placeholder || undefined,
    );
  }

  createSelectButtonIcon(): VNode {
    return this.createElement(
      'svg',
      {
        ref: 'selectButtonIcon',
        attrs: {
          fill: 'currentColor',
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 20 20',
        },
        class: this.component.getElementCssClass('selectButtonIcon'),
      },
      [
        this.createElement('path', {
          attrs: {
            'clip-rule': 'evenodd',
            'fill-rule': 'evenodd',
            d: 'M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z',
          },
        }),
      ],
    );
  }

  createSelectButtonClearIconWrapper(): VNode {
    return this.createElement(
      'svg',
      {
        ref: 'selectButtonClearIcon',
        attrs: {
          fill: 'currentColor',
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 20 20',
        },
        class: this.component.getElementCssClass('selectButtonClearIcon'),
      },
      [
        this.createElement('polygon', {
          attrs: {
            points: '10 8.58578644 2.92893219 1.51471863 1.51471863 2.92893219 8.58578644 10 1.51471863 17.0710678 2.92893219 18.4852814 10 11.4142136 17.0710678 18.4852814 18.4852814 17.0710678 11.4142136 10 18.4852814 2.92893219 17.0710678 1.51471863 10 8.58578644',
          },
        }),
      ],
    );
  }

  createSelectButtonClearIcon(): VNode {
    return this.createElement(
      'span',
      {
        ref: 'selectButtonClearIcon',
        class: this.component.getElementCssClass('selectButtonClearIconWrapper'),
        on: {
          click: this.component.clearIconClickHandler,
        },
      },
      [
        this.createElement(
          'svg',
          {
            attrs: {
              fill: 'currentColor',
              xmlns: 'http://www.w3.org/2000/svg',
              viewBox: '0 0 20 20',
            },
            class: this.component.getElementCssClass('selectButtonClearIcon'),
          },
          [
            this.createElement('polygon', {
              attrs: {
                points: '10 8.58578644 2.92893219 1.51471863 1.51471863 2.92893219 8.58578644 10 1.51471863 17.0710678 2.92893219 18.4852814 10 11.4142136 17.0710678 18.4852814 18.4852814 17.0710678 11.4142136 10 18.4852814 2.92893219 17.0710678 1.51471863 10 8.58578644',
              },
            }),
          ],
        ),
      ],
    );
  }

  /**
   * Div that wraps the search box
   */
  createSearchBoxWrapper() {
    return this.createElement(
      'div',
      {
        ref: 'searchWrapper',
        class: this.component.getElementCssClass('searchWrapper'),
      },
      [
        this.createSearchBox(),
      ],
    );
  }

  /**
   * Filter search box
   */
  createSearchBox() {
    return this.createElement(
      'input',
      {
        ref: 'searchBox',
        class: this.component.getElementCssClass('searchBox'),
        domProps: {
          value: this.component.query,
        },
        attrs: {
          placeholder: this.component.searchBoxPlaceholder,
        },
        on: {
          keydown: (e: KeyboardEvent) => {
            // Down
            if (e.keyCode === 40) {
              this.component.arrowDownHandler(e);
            // Up
            } else if (e.keyCode === 38) {
              this.component.arrowUpHandler(e);
            // Enter
            } else if (e.keyCode === 13) {
              this.component.enterHandler(e);
            }
          },
          blur: this.component.blurHandler,
          input: this.component.searchInputHandler,
        },
      },
    );
  }

  /**
   * The div used as dropdown with the options and the search box
   */
  createDropdown() {
    const subElements = [];

    if (!this.component.hideSearchBox) {
      subElements.push(this.createSearchBoxWrapper());
    }

    if (this.component.searching) {
      subElements.push(this.createDropdownFeedback(this.component.searchingText));
    } else if (!this.component.filteredOptions.length) {
      subElements.push(this.createDropdownFeedback(this.component.noResultsText));
    }

    if (this.component.filteredOptions.length) {
      subElements.push(this.createOptionsList(this.component.filteredOptions));
    }

    return this.createElement(
      'div',
      {
        ref: 'dropdown',
        class: this.component.getElementCssClass('dropdown'),
        style: {
          display: !this.component.show ? 'none' : undefined,
        },
      },
      subElements,
    );
  }

  /**
   * Options list wrapper
   */
  createOptionsList(options: NormalizedOptions) {
    return this.createElement(
      'ul',
      {
        ref: 'optionsList',
        attrs: {
          tabindex: -1,
        },
        class: this.component.getElementCssClass('optionsList'),
        style: {
          maxHeight: this.component.normalizedHeight,
        },
      },
      this.createOptions(options),
    );
  }

  /**
   * Dropdown feedback
   * @param text
   */
  createDropdownFeedback(text: string) {
    return this.createElement(
      'div',
      {
        ref: 'dropdownFeedback',
        class: this.component.getElementCssClass('dropdownFeedback'),
      },
      text,
    );
  }

  /**
   * List of options
   */
  createOptions(options: NormalizedOptions): VNode[] {
    let index = -1;
    return options
      .map((option: NormalizedOption) => {
        if (option.children) {
          return [
            option,
            ...option.children,
          ];
        }

        return option;
      })
      .flat()
      .map((option: NormalizedOption) => {
        if (option.children) {
          return this.createOptgroup(option);
        }
        index += 1;
        return this.createOption(option, index);
      });
  }

  /**
   * Creates an optgroup element
   * @param option
   * @param index
   */
  createOptgroup(
    optgroup: NormalizedOption,
  ): VNode {
    return this.createElement(
      'li',
      {
        attrs: {
          'data-type': 'optgroup',
        },
        class: this.component.getElementCssClass('optgroup'),
      },
      this.component.guessOptionText(optgroup),
    );
  }

  /**
   * Builds an option element
   * @param option
   * @param index
   */
  createOption(
    option: NormalizedOption,
    index: number,
  ): VNode {
    const isSelected = this.component.optionHasValue(
      option, this.component.localValue,
    );
    const isHighlighted = this.component.highlighted === index;

    let className;

    if (isHighlighted && isSelected) {
      className = this.component.getElementCssClass('selectedHighlightedOption');
    } else if (isHighlighted) {
      className = this.component.getElementCssClass('highlightedOption');
    } else if (isSelected) {
      className = this.component.getElementCssClass('selectedOption');
    } else {
      className = this.component.getElementCssClass('option');
    }

    return this.createElement(
      'li',
      {
        ref: 'option',
        class: className,
        attrs: {
          'data-type': 'option',
        },
        on: {
          mouseover: () => {
            this.component.highlighted = index;
          },
          mouseleave: () => {
            this.component.highlighted = null;
          },
          mousedown: (e: MouseEvent) => {
            e.preventDefault();
          },
          click: (e: MouseEvent) => {
            e.preventDefault();

            this.component.selectOption(option);
          },
        },
      },
      [
        this.createOptionContent(option, isSelected),
      ],
    );
  }

  createOptionContent(option: NormalizedOption, isSelected: boolean): VNode {
    const subElements = [
      this.createOptionLabel(option),
    ];

    if (isSelected) {
      subElements.push(this.createOptionSelectedIcon());
    }

    return this.createElement(
      'div',
      {
        ref: 'optionContent',
        class: this.component.getElementCssClass('optionContent'),
      },
      subElements,
    );
  }

  createOptionLabel(option: NormalizedOption): VNode {
    return this.createElement(
      'span',
      {
        ref: 'optionLabel',
        class: this.component.getElementCssClass('optionLabel'),
      },
      option.text as VNodeChildren,
    );
  }

  createOptionSelectedIcon(): VNode {
    return this.createElement(
      'svg',
      {
        ref: 'selectedIcon',
        attrs: {
          fill: 'currentColor',
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 20 20',
        },
        class: this.component.getElementCssClass('selectedIcon'),
      },
      [
        this.createElement('polygon', {
          attrs: {
            points: '0 11 2 9 7 14 18 3 20 5 7 18',
          },
        }),
      ],
    );
  }
}