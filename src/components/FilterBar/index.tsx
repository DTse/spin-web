import React, { useState, useReducer, useRef, useEffect, FC } from "react";

import {
  ClickAwayListener,
  Popper,
  Paper,
  TextField,
  Chip,
  Grow
} from "@material-ui/core";

import { Autocomplete } from "@material-ui/lab";

import { searchRequest, filtersRequest } from "services";
import NextStep from "./NextStep";

interface IState {
  [key: string]: Array<any>;
  availability: Array<any>;
  type: Array<any>;
  locations: Array<any>;
  sqMeters: Array<any>;
  price: Array<any>;
}

type Action =
  | { field: "reset" }
  | { field: "setAvailability"; availability: Array<any> }
  | { field: "setType"; type: Array<any> }
  | { field: "setLocations"; locations: Array<any> }
  | { field: "setSqMeters"; sqMeters: Array<any> }
  | { field: "setPrice"; price: Array<any> };

const initQuery = {
  availability: [],
  type: [],
  locations: [],
  sqMeters: [],
  price: []
};

let reducer = (state: IState, action: Action): IState => {
  switch (action.field) {
    case "setAvailability":
      return {
        ...state,
        availability: [...state.availability, action.availability]
      };
    case "setType":
      return { ...state, type: [...state.type, action.type] };
    case "setLocations":
      return { ...state, locations: [...state.locations, action.locations] };
    case "setSqMeters":
      return { ...state, sqMeters: [...state.sqMeters, action.sqMeters] };
    case "setPrice":
      return { ...state, price: [...state.price, action.price] };
    case "reset":
      return { ...initQuery };
    default:
      return { ...state };
  }
};

const initFilters: {
  id: string;
  type: string;
  label: string;
  options?: any;
}[] = [
  {
    id: "availability",
    type: "select",
    label: "Availability",
    options: {}
  },
  {
    id: "type",
    type: "select",
    label: "Type",
    options: {}
  },
  {
    id: "locations",
    type: "select",
    label: "Location",
    options: {}
  },
  {
    id: "sqMeters",
    type: "range",
    label: "Square Meters",
    options: {
      max: 0,
      min: 100
    }
  },
  {
    id: "price",
    type: "range",
    label: "Price",
    options: {
      min: 0,
      max: 100
    }
  }
];

interface IFilters {
  id: string;
  type: string;
  label: string;
  options: any;
  value?: any;
}

type FilterBarProps = {
  contextDispatch: Function;
};

/**
 * Create the Filter Bar component
 * @param {type}
 * @return {element}
 **/
const FilterBar: FC<FilterBarProps> = ({ contextDispatch }): JSX.Element => {
  const [query, dispatch] = useReducer(reducer, initQuery);
  const [pendingValue, setPending] = useState();
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [filters, setFilters] = useState(initFilters);

  let filterBarRef = useRef<HTMLElement | null>(null);

  const defaultProps = {
    options: filters,
    value: selected,
    getOptionLabel: (option: any) => option.label,
    PaperComponent: (params: any): JSX.Element => (
      <Grow
        in
        style={{ transformOrigin: "0 0 0", maxWidth: 250, width: "100%" }}
      >
        <Paper {...params}>
          {pendingValue ? (
            <NextStep
              setPending={setPending}
              pendingValue={pendingValue}
              setSelected={setSelected}
              selected={selected}
              dispatch={dispatch}
              setOpen={setOpen}
              filterBarRef={filterBarRef}
            />
          ) : (
            params.children
          )}
        </Paper>
      </Grow>
    ),
    PopperComponent: (params: any): JSX.Element => (
      <Popper
        {...params}
        anchorEl={anchorEl}
        style={{ maxWidth: 250, width: "100%" }}
        placement="bottom-start"
      />
    ),
    onChange: (event: any, value: any): void => {
      value.length === 0 ? handleReset() : setPending(value[value.length - 1]);
    }
  };

  const handleClick = (): void => {
    setOpen(true);
    setAnchorEl(filterBarRef.current);
  };

  const handleClose = (e: any): void => {
    if (
      e.target.classList.value !== "" &&
      e.target.classList.value.indexOf("Mui") !== 0
    ) {
      setOpen(false);
      setPending(null);
    }
  };

  // const handleDelete = (option: IFilters) => {
  // const result = query[option.id].filter(
  //   (item: any): boolean => item !== option.value
  // );
  // dispatch({ type: "delete", field: option.id, value: result });

  //   const newSelected = [
  //     ...selected.filter((item: any): boolean => {
  //       if (item.id === option.id) {
  //         return item.value !== option.value;
  //       } else {
  //         return true;
  //       }
  //     })
  //   ];
  //   setSelected([...newSelected]);
  // };

  const handleReset = () => {
    setSelected([]);
    setPending(null);
    setOpen(false);
    dispatch({ field: "reset" });
  };

  const getKeyByValue = (object: any, value: any) =>
    Object.keys(object).find((key: any) => object[key] === value);

  useEffect(() => {
    searchRequest(query).then((res: any) => {
      if (res.status === "success") {
        contextDispatch({ type: "setEntries", value: [...res.entries] });
        contextDispatch({
          type: "setPagination",
          value: { ...res.pagination }
        });
        contextDispatch({ type: "setQuery", value: { ...query } });
      }
    });
  }, [query, contextDispatch]);

  useEffect(() => {
    filtersRequest().then((res: any) => {
      if (res.status === "success") {
        setFilters([...res.filters]);
      }
    });
  }, []);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <>
        <Autocomplete
          {...defaultProps}
          multiple
          open={open}
          id="tags-standard"
          disableCloseOnSelect
          popupIcon={null}
          freeSolo
          renderTags={(value: Array<any>, getTagProps: any) => {
            return value.map((option: IFilters, index: number) => {
              const tagProps = getTagProps({ index });
              const finalValue =
                option.type === "select"
                  ? getKeyByValue(option.options, option.value)
                  : option.value;
              return (
                <Chip
                  className={tagProps.className}
                  data-tag-index={tagProps["data-tag-index"]}
                  key={tagProps.key}
                  tabIndex={tagProps.tabIndex}
                  clickable
                  variant="outlined"
                  label={`${option.label}: ${finalValue}`}
                  onClick={e => e.preventDefault()}
                  // onDelete={() => handleDelete(option)}
                />
              );
            });
          }}
          renderInput={params => (
            <TextField
              {...params}
              inputRef={filterBarRef}
              variant="standard"
              placeholder="Click to add filter"
              margin="normal"
              fullWidth
              onClick={handleClick}
            />
          )}
        />
      </>
    </ClickAwayListener>
  );
};

export default FilterBar;
