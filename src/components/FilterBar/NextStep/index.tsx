import React, {
  useState,
  useEffect,
  memo,
  FC,
  MutableRefObject,
  ChangeEvent
} from "react";

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
  let value: string | number;

  const [selectedItems, setSelectedItems] = useState();
  useEffect(() => {
    filterBarRef.current.blur();
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

  const InputSelect = memo(
    (props: any): JSX.Element => {
      const options = pendingValue.options;
      const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedItems(e.target.value as string);
        return props.onChange(e.target.value as string);
      };

      return (
        <FormControl>
          <InputLabel id="select">{pendingValue.label}</InputLabel>
          <Select
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
    }
  );

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

  const handleChange = (e: string | number) => (value = e);

  return (
    <Card className="NextStep">
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
          <InputSelect key="field-select-wrapper" onChange={handleChange} />
        )}
        {pendingValue && pendingValue.type === "range" && (
          <InputSelect key="field-select-wrapper" onChange={handleChange} />
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
