import React, { useState, useEffect, memo, FC } from "react";

import { getUnixTime, format } from "date-fns";
import _ from "lodash/fp";

import {
  TextField,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Button,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  ListSubheader
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";

const NextStep: FC = (): JSX.Element => {
  let value = "";

  useEffect(() => {
    filterBarRef.current.blur();
  }, []);

  const InputText = props => {
    const handleChange = e => props.onChange(e.target.value);

    return (
      <TextField
        id="filled-basic"
        className="field"
        margin="normal"
        type="text"
        placeholder={pendingValue.label}
        onChange={handleChange}
      />
    );
  };

  const InputSelect = memo(props => {
    const options = pendingValue.options;
    const [selectedItems, setSelectedItems] = useState("");
    const handleChange = e => {
      setSelectedItems(e.target.value);
      return props.onChange(e.target.value);
    };

    return (
      <FormControl>
        <InputLabel id="select">{pendingValue.label}</InputLabel>
        <Select
          MenuProps={{ className: "select-menu" }}
          onChange={handleChange}
          value={selectedItems}
        >
          {Object.keys(options).map((key, index) => (
            <MenuItem key={index} value={options[key]}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  });

  const handleSubmit = () => {
    setSelected([
      ...selected,
      {
        ...pendingValue,
        value: value
      }
    ]);
    dispatch({
      type: pendingValue.id,
      value: value
    });
    setOpen(false);
    setPending(null);
  };

  const handleClose = () => {
    setOpen(false);
    setPending(null);
  };

  const handleChange = pending => e => {
    value = e;
    if (pending.id === "nomos") lastNomos = e.split(" ")[1];
    else lastNomos = null;
  };

  return (
    <Card className="NextStep">
      <CardHeader
        title={pendingValue.label}
        action={
          <IconButton
            aria-label="close"
            onClick={() => handleClose()}
            className="close-icon-wrapper"
          >
            <CloseIcon className="close-icon" />
          </IconButton>
        }
      />
      <CardContent>
        {pendingValue.type === "select" && (
          <InputSelect
            key="field-select-wrapper"
            onChange={handleChange(pendingValue)}
          />
        )}
      </CardContent>
      <CardActions>
        <Button
          className="NextStep-action"
          size="small"
          onClick={() => handleSubmit()}
        >
          Αποθηκευση
        </Button>
      </CardActions>
    </Card>
  );
};

export default NextStep;
