import { useState, useEffect } from "react";
import * as Styles from "./style";
import * as Highcharts from "highcharts";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import Loader from "../../helper/loader";

export function Filter(props) {
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading]: any = useState(false);

  let [categoryProductList, setCategoryProductList]: any = useState([]);

  const [productList, setProductList] = useState([]);

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);

    let endpoint =
      "https://dummyjson.com/products/category/" + event.target.value;

    setIsLoading(true);
    fetch(endpoint)
      .then((res: any) => res.json())
      .then((products) => {
        setIsLoading(false);
        setCategoryProductList(products);
        let productData: any = [];
        products.products.forEach((data: any) => {
          productData.push(data.title);
        });
        setProductList(productData);
        props.report([]);
        return productData;
      });
  };

  const [categoryList, setCategoryList]: any = useState([]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [personName, setPersonName] = useState<string[]>([]);

  const [product, setProduct] = useState<string[]>([]);

  const handleChange2 = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setProduct(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((category) => {
        let categoryData: any = [];
        category.forEach((data: any) => {
          categoryData.push(data.name);
        });
        setCategoryList(categoryData);
        return category;
      });
  }, []);

  function MenuItems(): any {
    let items: any = [];

    for (let i = 0; i < categoryList.length; i++) {
      items.push(
        <MenuItem value={categoryList[i]}>{categoryList[i]}</MenuItem>
      );
    }

    return items;
  }

  function handleReport() {
    setIsLoading(true);

    setIsLoading(false);
    if (category !== "" && product.length === 0) {
      props.report(categoryProductList.products);
    } else {
      let filterDatas: any = [];
      product.forEach((data: any) => {
        let filter = categoryProductList.products.find((product) => {
          return data === product.title;
        });

        if (filter) {
          filterDatas.push(filter);
        }
      });

      props.report(filterDatas);
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Styles.Container>
      <Styles.Title>
        <div>Filters</div>
        <Styles.ButtonLabel
          onClick={() => {
            setCategory("");
            setProduct([]);
          }}
        >
          Clear
        </Styles.ButtonLabel>
      </Styles.Title>
      <br /> <br />
      <FormControl fullWidth>
        <InputLabel
          id="demo-simple-select-label"
          size="small"
          sx={{ fontSize: "10px", marginTop: "3px" }}
        >
          Select Category
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Select Category"
          onChange={handleChange}
          size="small"
          sx={{ fontSize: "12px", marginTop: "3px" }}
        >
          {categoryList.map((data: any) => {
            return <MenuItem value={data}>{data}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <br /> <br />
      <FormControl fullWidth>
        <InputLabel
          id="demo-multiple-checkbox-label"
          size="small"
          sx={{ fontSize: "10px", marginTop: "3px" }}
        >
          Select Product
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={product}
          onChange={handleChange2}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
          size="small"
          sx={{ fontSize: "12px", marginTop: "3px" }}
        >
          {productList.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={product.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <br />
      <div>
        <Styles.ReportButton
          variant="contained"
          disabled={category !== "" ? false : true}
          onClick={() => handleReport()}
        >
          Run Report
        </Styles.ReportButton>
      </div>
    </Styles.Container>
  );
}
