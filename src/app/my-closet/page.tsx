"use client";
import { useEffect, useState } from "react";
import {
  AccessoryItem,
  ClothingItem,
  FilterOption,
} from "../api/pinecone/types";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Badge,
  Stack,
} from "@mui/material";
import { PineconeResult } from "../pinecone/page";
import CustomSearchInput from "@/client/components/CustomSearchInput";
import CustomDropdown from "@/client/components/CustomDropdown";
import CustomButton from "@/client/components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { setExistingWardrobe } from "@/lib/features/user-profile/userProfileSlice";

const MyCloset: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sessionId = useSelector(
    (state: RootState) => state.userProfile.sessionId
  );

  const [categoryOptions, setCategoryOptions] = useState<FilterOption[]>([]);
  const [colorOptions, setColorOptions] = useState<FilterOption[]>([]);
  const [styleOptions, setStyleOptions] = useState<FilterOption[]>([]);

  const [results, setResults] = useState<PineconeResult | null>(null);
  const [filteredItems, setFilteredItems] = useState<
    (ClothingItem | AccessoryItem)[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    color: "",
    style: "",
  });

  const { existingWardrobe } = useSelector(
    (state: RootState) => state.userProfile
  );
  useEffect(() => {
    const fetchData = async () => {
      if (sessionId) {
        setIsLoading(true);
        setError(null);

        try {
          // Fetch both wardrobe data and filter options in a single request
          const response = await fetch("/api/pinecone", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              method: "query", // First method: query for wardrobe data
              data: {
                query: "Describe the user's existing wardrobe",
              },
              sessionId: sessionId,
            }),
          });

          if (response.ok) {
            const wardrobeData: PineconeResult = await response.json();
            const wardrobeItems = wardrobeData.matches.map(
              (match) => match.metadata as ClothingItem | AccessoryItem
            );
            dispatch(setExistingWardrobe(wardrobeItems));
            setFilteredItems(wardrobeItems);
            setResults(wardrobeData);
          } else {
            throw new Error("Error fetching wardrobe data");
          }

          // Fetch filter options in the same effect block
          const filterResponse = await fetch("/api/pinecone", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              method: "fetchFilterOptions",
              sessionId: sessionId,
            }),
          });

          if (filterResponse.ok) {
            const filterOptionsData = await filterResponse.json();
            setCategoryOptions(filterOptionsData.categoryOptions);
            setColorOptions(filterOptionsData.colorOptions);
            setStyleOptions(filterOptionsData.styleOptions);
          } else {
            throw new Error("Error fetching filter options");
          }
        } catch (err: any) {
          setError(
            err.message ||
              "An error occurred while fetching data from Pinecone."
          );
          console.error("Error details:", err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData(); // Call the function to fetch data
  }, [dispatch, sessionId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    setIsLoading(true);
    setError(null);

    try {
      if (
        query === "" &&
        !filters.category &&
        !filters.color &&
        !filters.style
      ) {
        // No query and no active filters, fetch all items
        setFilteredItems(existingWardrobe);
      } else {
        // Construct filter object for Pinecone query
        const pineconeFilters: Record<string, string> = {};
        if (filters.category) pineconeFilters.category = filters.category;
        if (filters.color) pineconeFilters.color = filters.color;
        if (filters.style) pineconeFilters.style = filters.style;

        // Send the query and filter object to your API endpoint
        const response = await fetch("/api/pinecone", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            method: "query",
            data: {
              query: query ? query : "Describe the user's existing wardrobe",
              filter: pineconeFilters,
            },
            sessionId: sessionId,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json(); // Try to get detailed error info
          throw new Error(errorData.error || "Error querying Pinecone");
        }

        // Parse the response from Pinecone
        const data = (await response.json()) as PineconeResult;

        // Update the filtered items state with results from Pinecone
        setFilteredItems(
          data.matches.map(
            (match) => match.metadata as ClothingItem | AccessoryItem
          )
        );
      }
    } catch (error: any) {
      // Handle errors, update error state and log to console
      setError(error.message || "An error occurred while querying.");
      console.error(error);
    } finally {
      // Set loading to false after the API call, regardless of success or failure
      setIsLoading(false);
    }
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  return (
    <Container maxWidth="md">
      <Box className="container mx-auto p-4" p={4}>
        <Typography variant="h5" component="h1" gutterBottom>
          Explore My Wardrobe
        </Typography>

        <Box mt={4} display="flex" alignItems="center">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomSearchInput
                  label="search your wardrobe"
                  placeholder="Enter your query (e.g., 'red dress')"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomDropdown
                  label="category"
                  value={filters.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                  options={categoryOptions}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomDropdown
                  label="color"
                  value={filters.color}
                  onChange={(e) => handleFilterChange("color", e.target.value)}
                  options={colorOptions}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomDropdown
                  label="style"
                  value={filters.style}
                  onChange={(e) => handleFilterChange("style", e.target.value)}
                  options={styleOptions}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomButton
                  type="submit"
                  color="customBlack"
                  disabled={isLoading}
                >
                  {isLoading ? "Searching..." : "Search"}
                </CustomButton>
              </Grid>
            </Grid>
          </form>
        </Box>

        {/* Results Section (Carousel) */}
        {isLoading ? (
          <Box mt={4} display="flex" alignItems="center">
            <CircularProgress color="warning" />
            <Typography variant="body1" ml={2}>
              Searching...
            </Typography>
          </Box>
        ) : error ? (
          <Typography variant="body1" color="error" mt={2}>
            {error}
          </Typography>
        ) : filteredItems.length > 0 ? (
          <Grid container spacing={2} mt={2}>
            {filteredItems.map((item, index) => (
              <Grid mb={4} item xs={12} md={4} key={index}>
                <Card
                  className="transform hover:scale-105 transition-transform duration-300 shadow-md"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    borderRadius: 2, // Consistent rounded corners
                    overflow: "hidden", // Prevents image overflow
                    transition: "box-shadow 0.3s ease", // Smooth transition for hover effect
                    "&:hover": {
                      boxShadow: 5,
                    },
                  }}
                >
                  {/* CardMedia (Optional) */}
                  {/* {item.imageUrl && ( // Conditionally render if imageUrl exists
                    <CardMedia
                      component="img"
                      alt={item.itemId}
                      height="250" // Or any desired fixed height
                      image={item.imageUrl}
                      sx={{ objectFit: "cover" }} // Maintain aspect ratio and cover the container
                    />
                  )} */}

                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={1}
                      mb={2}
                      sx={{
                        px: 2,
                        py: 1,
                        borderBottom: "1px solid lightgray",
                        pr: 4, // Add extra padding to the right
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          // Custom styles for the Typography component
                          textTransform: "capitalize",
                          fontWeight: "bold", // Optional: Make the subcategory text bold
                          fontSize: 16, // Optional: Adjust font size
                        }}
                      >
                        {item.subcategory}
                      </Typography>

                      {item.brand && (
                        <Badge
                          badgeContent={item.brand}
                          color="primary" // Consider changing to a different color for better contrast
                          sx={{
                            // Custom styles for the Badge component
                            textTransform: "capitalize",
                            fontSize: 12,
                            fontWeight: "bold",
                            padding: "4px 8px",
                            borderRadius: 4,
                            // Customize the background color:
                            backgroundColor: "lightgray", // Example: A light gray background
                            color: "black", // Example: Black text for better contrast
                          }}
                        />
                      )}
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {item.additionalNotes}
                    </Typography>

                    <Box mt={1}>
                      {(item.style || []).map((style) => (
                        <Chip
                          key={style}
                          label={style}
                          size="small"
                          className="mr-1"
                        />
                      ))}
                      {(item.color || []).map((color) => (
                        <Chip
                          key={color}
                          label={color}
                          size="small"
                          className="mr-1"
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" mt={2}>
            No results found.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default MyCloset;
