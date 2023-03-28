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

/**
 * The plan is, pass all data into constructor then let the
 * object to get all it needs
 * */
export interface IConstructorArgs {
  level1Data: IGithubRestApiUserInfo;
  level2Data: IGraphQLResponse;
}

export class E_MissingTemplateValues extends TypeError {}
export class E_RenderingUndefinedTemplate extends TypeError {}

export default abstract class AbstractGraph<T extends IBasicGraph> {
  protected position: ICoordinate;
  protected dimension: IDimension;

  public props: Partial<T>;
  protected records: number[];

  protected abstract readonly svgPath: string;
  protected svgTemplate: ReturnType<typeof Template> | null;

  protected abstract readonly TEMPLATE_PAIR: Record<string, string>;
  protected dataParams: Partial<IConstructorArgs>;

  constructor(dataParams: IConstructorArgs) {
    this.props = {} as T;

    this.records = [];
    this.position = { x: 0, y: 0 };
    this.dimension = {
      width: 0,
      height: 0
    };

    this.svgTemplate = null;
    this.loadParseSVG();

    this.dataParams = {};
    Object.assign(this.dataParams, dataParams);

    this.propsInitializer();
  }

  private loadParseSVG(): void {
    const file = SVGGetter(this.svgPath);
    this.svgTemplate = Template(file);
  }

  public data(records: number[]): void {
    this.records = records;
  }

  //public abstract render(): string;

  /**
   * Automatically call after the constructor has been initialize
   * */
  protected abstract propsInitializer(): void;

  public move({ x, y }: ICoordinate): void {
    this.position = { x, y };
  }

  public resize({ width, height }: IDimension): void {
    this.dimension = { width, height };
  }

  protected generateValues(): void {
    const propKeys = Object.keys(this.TEMPLATE_PAIR);

    const values = propKeys.map((propKey) => {
      try {
        const value = this.props[propKey as keyof typeof this.props];
        if (typeof value === void 0 || value === void 0) {
          throw new Error(`Key ${propKey} has no value`);
        }
      } catch (err) {
        //   throw new E_MissingTemplateValues(err);
      }
    });
  }
}
