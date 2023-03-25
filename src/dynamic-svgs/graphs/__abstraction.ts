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
export class E_RederingUndefinedTemplate extends TypeError {}

export default abstract class AbstractGraph<T extends IBasicGraph>implements IFuck {
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

  public abstract render(): string;

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
}


/**
 * I tried to use the abstract class to pass uninitialize 
 * class object into variable but it gets complicated
 * 
 * So, i decided to create an interface that needed to implemented
 * 
 * 
 * */
 
 
export interface IFuck {
  
}