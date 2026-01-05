/*
export const Sorts = ({ queryBuilder, factory }: Props) => {
  return (
    factory.sorts?.length > 0 && (
      <div
        className="button icon-button shadow-md button-primary"
        onClick={({ currentTarget: target }) => PopupSorts({ target, queryBuilder, sorts: service.sorts })}>
        <Icon icon="sort-outline" className="fill-white" />
      </div>
    )
  );
};
const PopupSorts = ({ target, queryBuilder, sorts }: SortsContentProps) => {
  const id = "sorts";
  const defaultSort = "sort-id";
  if (!queryBuilder.get(defaultSort)) {
    queryBuilder.queryParams[defaultSort] = { id: defaultSort, value: "desc" };
  }
  PopupMe(SortsContent, {
    id,
    target,
    componentProps: { queryBuilder, sorts } as SortsContentProps,
    childClass: "popup-filter",
    animation: "height",
  });
};

type SortsContentProps = {
  queryBuilder: QueryBuilder<any>;
  sorts: any[];
  [key: string]: any;
};

const SortsContent = ({ queryBuilder, sorts, popup }: SortsContentProps) => {
  const cancelSort = () => {
    const params = queryBuilder.queryParams;
    Object.keys(params).forEach((key) => {
      if (key.startsWith("sort-")) delete params[key];
    });
    queryBuilder.setQueryParams(params);
    popup.remove();
  };
  return (
    <div className="gap-lg col line-h:24px">
      <p onClick={cancelSort} className={`min-w-max row-center gap-lg text-red`}>
        {GetLabel("cancel")}
      </p>
      {sorts.map((sort) => {
        const { id, label } = typeof sort === "string" ? { id: sort, label: sort } : sort;
        const sortId = `sort-${id}`;
        const [value, setValue] = React.useState<string>(queryBuilder.get(sortId));
        const onChange = (value: string) => {
          queryBuilder.updateQueryParams({ id: sortId, value });
          setValue(value);
        };

        return (
          <Fragment key={id}>
            <DecsSortButton label={label} active={value === "desc"} onClick={() => onChange(value === "desc" ? undefined : "desc")} />
            <AscSortButton label={label} active={value === "asc"} onClick={() => onChange(value === "asc" ? undefined : "asc")} />
          </Fragment>
        );
      })}
    </div>
  );
};

const DecsSortButton = ({ label, active, onClick }) => {
  return (
    <div data-sort-active={active} onClick={onClick} className={`min-w-max row-center gap-lg`}>
      <Icon icon="sort-from-top-to-bottom-outline" className="py-sm" />
      {LangBuilder.sortsDesc(label)}
    </div>
  );
};

const AscSortButton = ({ label, active, onClick }) => {
  return (
    <div data-sort-active={active} onClick={onClick} className={`min-w-max row-center gap-lg`}>
      <Icon icon="sort-from-bottom-to-top-outline" className="py-sm" />
      {LangBuilder.sortsAsc(label)}
    </div>
  );
};
*/
