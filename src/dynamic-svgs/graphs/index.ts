import V1 from './v1';
import ParentClass, { IConstructorArgs } from './__abstraction';

export type IGraphUninitializeObject = new (
  dataParams: IConstructorArgs
) => ParentClass<any>;

const graphList = new Map<string, IGraphUninitializeObject>();

graphList.set('Default', V1);

export default graphList;
