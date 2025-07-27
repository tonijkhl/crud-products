import { useEffect, useState } from "react";
import { getProductCategories } from "../services/api";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography
} from "@mui/material";

function CategoriesList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getProductCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch categories:", err);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Product Categories
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Description</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} align="center">No categories found.</TableCell>
            </TableRow>
          ) : (
            categories.map((cat) => (
              <TableRow key={cat.category_id || cat.id}>
                <TableCell>{cat.category_name}</TableCell>
                <TableCell>{cat.category_description}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CategoriesList;
