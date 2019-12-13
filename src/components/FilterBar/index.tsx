import React, { useState, useReducer, useRef, useEffect, memo } from "react";

import _ from "lodash/fp";

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

import searchRequest from "./requests.js";
import NextStep from "./NextStep";

interface IState {
    id:  Array<any>,
    firstName:  Array<any>,
    lastName:  Array<any>,
    number:  Array<any>,
    email: Array<any>
}

type Action = { type: "reset" } | { type: "set"; [key: string]: any } | { type: "delete", [key: string]: any };

let reducer = (state: IState, action: Action) => {
  switch (action.type) {
    case "set":
      return { ...state, [action.type]: [...state[action.type], action.value] };
    case "delete":
      return { ...state, [action.field]: [...action.value] };
    case "reset":
      return { ...initQuery };
    default:
      return { ...state };
  }
};

const initQuery = {
  id: [],
  firstName: [],
  lastName: [],
  number: [],
  email: []
};

const filters = [
  {
    id: "id",
    type: "text",
    label: "ID"
  },
  {
    id: "email",
    type: "text",
    label: "Email"
  },
  {
    id: "status",
    type: "select",
    label: "Κατάσταση",
    options: {
      Εγγεγραμμένοι: "",
      Ταυτοποιημένοι: 1
    }
  },
  {
    id: "gender",
    type: "select",
    label: "Φύλο",
    options: {
      Άρρεν: "male",
      Θήλυ: "female"
    }
  },
];

let lastNomos = null;

/**
 * Create the Filter Bar component
 * @param {type}
 * @return {element}
 **/
const FilterBar = () => {
  const [query, dispatch] = useReducer(reducer, initQuery);
  const [pendingValue, setPending] = useState(null);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [running, setRunning] = useState(false);

  let filterBarRef = useRef(0);

  const defaultProps = {
    options: filters,
    value: selected,
    getOptionLabel: (option: any) => option.label,
    PaperComponent: (params: any): JSX.Element => (
      <Grow in style={{ transformOrigin: "0 0 0" }}>
        <Paper {...params}>
          {pendingValue !== null ? <NextStep /> : params.children}
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
    onChange: (event: any, value: any) => {
      value.length === 0 ? handleReset() : setPending(value[value.length - 1]);
    }
  };

  const handleClick = () => {
    setOpen(true);
    setAnchorEl(filterBarRef.current);
  };

  const handleClose = e => {
    if (
      e.target.classList.value !== "" &&
      e.target.classList.value.indexOf("Mui") !== 0
    ) {
      setOpen(false);
      setPending(null);
    }
  };

  const handleDelete = option => {
    const result = query[option.id].filter(item => item !== option.value);
    dispatch({ type: "delete", field: option.id, value: result });

    const newSelected = [
      ...selected.filter(item => {
        if (item.id === option.id) {
          return item.value !== option.value;
        } else {
          return true;
        }
      })
    ];
    setSelected([...newSelected]);
  };

  const handleReset = () => {
    setSelected([]);
    setPending(null);
    setOpen(false);
    dispatch({ type: "reset" });
    sessionStorage.removeItem("filterBar");
    sessionStorage.removeItem("query");
  };

  const getKeyByValue = (object: any, value: any) =>
    Object.keys(object).find(key: any => object[key] === value);

  useEffect(() => {
    window.page = 0;
    sessionStorage.setItem("filterBar", JSON.stringify(selected));
    setRunning(true);
    searchRequest(query).then(res => {
      if (res.status === "success") {
        setRunning(false);
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
          renderTags={(value: any, getTagProps: any) => {
            return value.map((option: any, index: number) => {
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
                  onDelete={() => handleDelete(option)}
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
        {running && <LinearProgress />}
      </>
    </ClickAwayListener>
  );
};

export default FilterBar;
