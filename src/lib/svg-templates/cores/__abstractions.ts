import Template from 'lodash/template.js';
import { SVGGetter } from '../../dynamic-svg-getter';

export interface ICoreProps {
  dimension: IDimension;
  position: ICoordinate;
}

export interface ICoreConstructor extends Partial<ICoreProps> {}

export abstract class CoreAbstract {
  protected abstract readonly content: ReturnType<typeof SVGGetter>;

  protected template: ReturnType<typeof Template> | null;
  protected props: ICoreProps;

  constructor(props?: ICoreConstructor) {
    this.template = null;
    this.props = {
      dimension: {
        width: 256,
        height: 256
      },
      position: {
        x: 0,
        y: 0
      }
    };

    this.parseTemplate();
  }

  public move(coord: ICoordinate): void {
    this.props.position = coord;
  }

  public resize(dimension: IDimension): void {
    this.props.dimension = dimension;
  }

  private parseTemplate(): void {
    this.template = Template(this.content);
  }
}
