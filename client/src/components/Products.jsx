import { useState } from 'react';
import { ProductList } from '../services/ProductsList';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-evenly;
  }
`;

const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;


const SearchBar = styled.input`
  padding: 5px;
  margin: 5px;
  width: 100%;
  max-width: 200px;

  @media (min-width: 768px) {
    width: auto;
  }
`;

const FilterButton = styled.button`
  background-color: black;
  color: white;
  margin: 5px;

  @media (min-width: 768px) {
    margin: 0 10px;
  }
`;

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;



const Product = styled.div`
  width: 100%;
  max-width: 300px;
  border: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;

  img{
    height: 100px;
    width: 100px;
  }

  @media (min-width: 768px) {
    width: 45%;
  }
`;




const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ProductPerPage = 6;

  const filteredProducts = ProductList.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter((product) =>
    selectedCategory ? product.category === selectedCategory : true
  );

  const indexOfLastProduct = currentPage * ProductPerPage;
  const indexOfFirstProduct = indexOfLastProduct - ProductPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <Container>
      <SideContainer>
        <FilterButton onClick={() => handleCategoryFilter('Electronics')}>
          Filter Electronics
        </FilterButton>
        <FilterButton onClick={() => handleCategoryFilter('Clothing')}>
          Filter Clothing
        </FilterButton>
        <SearchBar
          type="text"
          placeholder="Search products"
          value={searchQuery}
          onChange={handleSearch}
        />
      </SideContainer>
      <ProductContainer>
        {currentProducts.map((product) => (
          <Product key={product.id}>
            <img src={product.img} alt={product.productName} />
            <h2>{product.productName}</h2>
            <p>Description: {product.description}</p>
            <p>Price: ${product.cost}</p>
          </Product>
        ))}
      </ProductContainer>
      {filteredProducts.length > ProductPerPage && (
        <div>
          {Array(Math.ceil(filteredProducts.length / ProductPerPage))
            .fill()
            .map((_, index) => (
              <span
                key={index + 1}
                onClick={() => paginate(index + 1)}
                style={{
                  cursor: 'pointer',
                  margin: '0 5px',
                  padding: '5px',
                  border: '1px solid #ccc',
                }}
              >
                {index + 1}
              </span>
            ))}
        </div>
      )}
    </Container>
  );
};

export default Products;
