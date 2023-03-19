import Template from 'lodash/template.js';
import { SVGGetter } from '../../dynamic-svg-getter';
import { CoreAbstract, ICoreConstructor } from './__abstractions';

export class Core extends CoreAbstract {
  protected readonly content: ReturnType<typeof SVGGetter> =
    SVGGetter('starship-avalon/core');

  constructor(props: ICoreConstructor) {
    super(props);
  }
}
