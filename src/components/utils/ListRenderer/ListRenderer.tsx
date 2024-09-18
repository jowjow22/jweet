interface ListRendererProps<T, P extends object>{
  itemPropName: string;
  items: T[];
  ChildComponent: React.ComponentType<P>
}

export const ListRenderer = <T,P extends object>({
  itemPropName,
  items,
  ChildComponent,
}:ListRendererProps<T,P>) => {


  return (
    <>
      {items.map((item, index) => (
        <ChildComponent key={index}  {...{ [itemPropName]: item } as P} />
      ))}
    </>
  );
};