import React, {
  useState,
  useReducer,
  useRef,
  useEffect,
  memo,
  FC
} from "react";

import {
  ClickAwayListener,
  Popper,
  Paper,
  TextField,
  Chip,
  Grow,
  LinearProgress
} from "@material-ui/core";

import { Autocomplete } from "@material-ui/lab";

import { searchRequest } from "services/searchRequest";
import NextStep from "./NextStep";

interface IState {
  [key: string]: Array<any>;
  availability: Array<any>;
  type: Array<any>;
  location: Array<any>;
  sqMeters: Array<any>;
  price: Array<any>;
}

type Action =
  | { field: "reset" }
  | { field: "setAvailability"; availability: Array<any> }
  | { field: "setType"; type: Array<any> }
  | { field: "setLocation"; location: Array<any> }
  | { field: "setSqMeters"; sqMeters: Array<any> }
  | { field: "setPrice"; price: Array<any> };

const initQuery = {
  availability: [],
  type: [],
  location: [],
  sqMeters: [],
  price: []
};

let reducer = (state: IState, action: Action): IState => {
  switch (action.field) {
    case "setAvailability":
      return { ...state, availability: [...action.availability] };
    case "setType":
      return { ...state, type: [...action.type] };
    case "setLocation":
      return { ...state, location: [...action.location] };
    case "setSqMeters":
      return { ...state, sqMeters: [...action.sqMeters] };
    case "setPrice":
      return { ...state, price: [...state.price, action.price] };
    case "reset":
      return { ...initQuery };
    default:
      return { ...state };
  }
};

const filters: { id: string; type: string; label: string; options?: any }[] = [
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
    id: "location",
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
      min: 0
    }
  },
  {
    id: "price",
    type: "range",
    label: "Price",
    options: {
      min: 0,
      max: 0
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
  let filterBarRef = useRef<HTMLElement | null>(null);
  console.log(pendingValue);
  const defaultProps = {
    options: filters,
    value: selected,
    getOptionLabel: (option: any) => option.label,
    PaperComponent: (params: any): JSX.Element => (
      <Grow in style={{ transformOrigin: "0 0 0" }}>
        <Paper {...params}>
          {pendingValue ? (
            <NextStep
              setPending={setPending}
              pendingValue={pendingValue}
              setSelected={setSelected}
              selected={selected}
              dispatch={contextDispatch}
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
        className="bar-dropdown"
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
      }
    });
  }, [query]);

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
              placeholder="Click για νέο φίλτρο"
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
