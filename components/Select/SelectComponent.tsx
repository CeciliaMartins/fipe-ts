import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


type Props = {
    options?: Array<any>,
    value?: any,
    label?: string,
    handleChange?: (value: any) => void,
    minWidth?: number,
    margin?: number,
    msgNone?: string,

}

export default function SelectComponent({
    options,
    label,
    value,
    handleChange,
    minWidth,
    margin,
    msgNone,
}: Props) {
    return (
        <>
            <FormControl sx={{ m: margin, minWidth: minWidth }}>
                <InputLabel id="demo-simple-select-autowidth-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={value}
                    onChange={handleChange}
                    autoWidth
                    label={label}
                >
                    {options && options.length > 0 ? (
                        options.map((option, i) => (
                            <MenuItem key={i} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem value="none">{msgNone || "Não está disponivel"}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </>
    );
}
