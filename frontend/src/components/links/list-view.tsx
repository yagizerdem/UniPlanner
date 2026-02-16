import {
  TreeView,
  type TreeDataItem,
  type TreeRenderItemParams,
} from "../ui/tree-view";

export function LinksListView() {
  const data: TreeDataItem[] = [
    {
      id: "1",
      name: "Item 1",
      children: [
        {
          id: "2",
          name: "Item 1.1",

          children: [
            {
              id: "3",
              name: "Item 1.1.1",
            },
            {
              id: "4",
              name: "Item 1.1.2",
            },
          ],
        },
        {
          id: "5",
          name: "Item 1.2 (disabled)",

          disabled: true,
        },
      ],
    },
    {
      id: "6",
      name: "Item 2 (draggable)",
      draggable: true,
    },
  ];

  return (
    <div className="w-full h-full">
      <TreeView
        data={data}
        renderItem={(params: TreeRenderItemParams) => {
          return <div>{params.item.name}</div>;
        }}
      />
    </div>
  );
}
