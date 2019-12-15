import React, { useState, useEffect, SFC, FC, MutableRefObject } from "react";

import {
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
  Slider
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";

type PendingType = {
  id: string;
  label: string;
  type: string;
  options?: any;
};

type NextStepTypes = {
  setPending: Function;
  setSelected: Function;
  setOpen: Function;
  selected: Array<object>;
  pendingValue: PendingType;
  filterBarRef: MutableRefObject<any>;
  dispatch: any;
};

const NextStep: FC<NextStepTypes> = ({
  setPending,
  setSelected,
  setOpen,
  filterBarRef,
  pendingValue,
  selected,
  dispatch
}): JSX.Element => {
  let value: number | number[] = 0;

  const [selectedItems, setSelectedItems] = useState<number | number[]>();

  useEffect(() => {
    filterBarRef.current.blur();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const InputText = (props) => {
  //   const handleChange = e => props.onChange(e.target.value);

  //   return (
  //     <TextField
  //       id="filled-basic"
  //       className="field"
  //       margin="normal"
  //       type="text"
  //       placeholder={pendingValue.label}
  //       onChange={handleChange}
  //     />
  //   );
  // };

  const InputSelect: SFC = (): JSX.Element => {
    const options = pendingValue.options;
    const handleChange = (e: React.ChangeEvent<{ value: unknown }>): void => {
      setSelectedItems(e.target.value as number);
    };

    return (
      <FormControl style={{ width: "100%" }}>
        <InputLabel id="select">{pendingValue.label}</InputLabel>
        <Select
          defaultValue={""}
          MenuProps={{ className: "select-menu" }}
          onChange={handleChange}
          value={selectedItems}
        >
          {Object.keys(options).map((key: string | number, index: number) => (
            <MenuItem key={index} value={options[key]}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  const InputRange: SFC = (): JSX.Element => {
    const options = pendingValue.options;

    const handleChange = (
      e: React.ChangeEvent<unknown>,
      newValue: number | number[]
    ): void => {
      setSelectedItems(newValue as number[]);
    };

    return (
      <Slider
        defaultValue={[options.min, options.max]}
        value={selectedItems}
        min={options.min}
        max={options.max}
        step={1}
        onChangeCommitted={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
      />
    );
  };

  const handleSubmit = () => {
    setSelected([
      ...selected,
      {
        ...pendingValue,
        value: selectedItems
      }
    ]);
    dispatch({
      field: `set${pendingValue.id.charAt(0).toUpperCase() +
        pendingValue.id.slice(1)}`,
      [pendingValue.id]:
        pendingValue.type === "range" ? [selectedItems] : selectedItems
    });
    setOpen(false);
    setPending(null);
  };

  const handleClose = () => {
    setOpen(false);
    setPending(null);
  };

  return (
    <Card className="NextStep" style={{ maxWidth: 250 }}>
      <CardHeader
        title={pendingValue && pendingValue.label}
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
        {pendingValue && pendingValue.type === "select" && (
          <InputSelect key="field-select-wrapper" />
        )}
        {pendingValue && pendingValue.type === "range" && (
          <InputRange key="field-select-wrapper" />
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
