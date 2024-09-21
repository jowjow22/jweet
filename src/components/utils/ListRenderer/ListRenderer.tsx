/* eslint-disable @typescript-eslint/no-explicit-any */
interface ListRendererProps<T extends { [key: string]: any }, P extends object, K extends object>{
  itemPropName: string;
  items: T[];
  ChildComponent: React.ComponentType<P>
  keyValue: string;
  extraProps?: K;
}

export const ListRenderer = <T extends { [key: string]: any },P extends object, K extends object>({
  itemPropName,
  items,
  ChildComponent,
  keyValue,
  extraProps,
}:ListRendererProps<T,P, K>) => {


  return (
    <>
      {!!items.length && items.map((item, index) => (
        <ChildComponent key={keyValue ? item[keyValue] : index}  {...{ [itemPropName]: item } as P} {...extraProps as K} />
      ))}
    </>
  );
};