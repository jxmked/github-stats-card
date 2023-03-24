import ParentClass, { IBasicGraph } from './__abstraction';

/**
 * Style - Default value
 * */

export interface IProps extends IBasicGraph {
  baseTextColor: string; // Color of all text
  hardLineColor: string; // In-graph dash (hard)
  softLineColor: string; // In-graph dash (soft)
  baseOutline: string; // Border outline
  maxGraphValue: number; // Highest commits
  halfGraphValue: number; // Division by 2 of maxGraphValue
  commitType: string; // Public/private
  recordRange: number; // Days
}

/**
 * Contains Keys in template and processed value
 * */
export interface ITemplateKeys {
  'BASE-TEXT-COLOR': string;
  'CHART_RECORD_HITS': string;
  'COMMIT-TYPE': string;
  'BASE-OUTLINE-COLOR': string;
  'HARD-DASH-ARRAY-COLOR': string;
  'SOFT-DASH-ARRAY-COLOR': string;
}

export default class V1 extends ParentClass<IProps> {
  protected readonly svgPath = 'graphs/v1';

  protected readonly TEMPLATE_PAIR = {
    hardLineColor: 'HARD-DASH-ARRAY-COLOR',
    softLineColor: 'SOFT-DASH-ARRAY-COLOR',
    baseTextColor: 'BASE-TEXT-COLOR'
  };

  protected propsInitializer(): void {
    this.props.hardLineColor = '';
    this.props.softLineColor = '';

    this.props.baseTextColor = 'rgb(167, 202, 224)';
  }

  public render(): string {
    return '';
  }
}
