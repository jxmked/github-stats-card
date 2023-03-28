import ParentClass, { IBasicGraph, E_RenderingUndefinedTemplate } from './__abstraction';

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
    baseTextColor: 'BASE-TEXT-COLOR',
    commitType: 'COMMIT-TYPE',
    baseOutline: 'BASE-OUTLINE-COLOR',
    maxGraphValue: 'CHART_FULL_GRAPH',
    halfGraphValue: 'CHART_HALF_GRAPH',
    recordRange: 'CHART_FULL_GRAPH'
  };

  protected propsInitializer(): void {
    this.props.hardLineColor = '#ff0000';
    this.props.softLineColor = '#fff000';

    this.props.baseTextColor = 'rgb(167, 202, 224)';
  }
}
