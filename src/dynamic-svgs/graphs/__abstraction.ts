import Template from 'lodash/template.js';
import { SVGGetter } from '../../lib/dynamic-svg-getter';

/**
 * The plan is to all child class of this will
 * provide 'svgPath' from '(./dynamic-svgs)'
 * and render method
 *
 * after providing,
 *
 *
 * */

export interface IBasicGraph {
  backgroundColor: string;
  textColor: string;
}

export default abstract class AbstractGraph<T extends IBasicGraph> {
  protected position: ICoordinate;
  protected dimension: IDimension;

  public props: Partial<T>;
  protected records: number[];

  protected abstract readonly svgPath: string;
  protected svgTemplate: ReturnType<typeof Template> | null;

  constructor() {
    this.props = {
      backgroundColor: '',
      textColor: ''
    } as T;

    this.records = [];
    this.position = { x: 0, y: 0 };
    this.dimension = {
      width: 0,
      height: 0
    };

    this.svgTemplate = null;
    this.loadParseSVG();
  }

  private loadParseSVG(): void {
    const file = SVGGetter(this.svgPath);
    this.svgTemplate = Template(file);
  }

  public data(records: number[]): void {
    this.records = records;
  }

  public abstract render(): string;

  public move({ x, y }: ICoordinate): void {
    this.position = { x, y };
  }

  public resize({ width, height }: IDimension): void {
    this.dimension = { width, height };
  }
}
