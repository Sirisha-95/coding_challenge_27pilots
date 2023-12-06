import { Fragment, ReactElement, useState, useEffect } from "react";
import { Startup } from "../../Types/Startup";
import { Card, CardContent, Grid, Pagination, Typography } from "@mui/material";
import { StartupHttpService } from "../../Http/Startup/Startup.http.service";

export default function StartupList(): ReactElement {
  const [startUpsList, setStartUpsList] = useState<Startup[]>([]);
  const [page, setPage] = useState<number>(1);
  //const [pageLimits, setPageLimits]=useState({startIndex:0,endInde})
  const pageLimit = 20;
  const fetchData = async () => {
    try {
      const response = await StartupHttpService.getStartups();
      if (!response) {
        throw new Error("Invalid data");
      }
      console.log(response);
      setStartUpsList(response);
    } catch (err) {
      throw new Error("Data not found");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
    console.log("page", page);
  };

  return (
    <Fragment>
      <Grid id="startup-list">
        {startUpsList
          .slice((page - 1) * pageLimit, page * pageLimit)
          .map((item: Startup) => {
            return (
              <Grid item>
                <Card variant="outlined" sx={{ m: 2 }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {item.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Founded: {new Date(item.dateFounded).getFullYear()} |
                      {item.employees} Employees | ${item.totalFunding} Mio. |{" "}
                      {item.currentInvestmentStage}
                    </Typography>
                    <Typography variant="body2">
                      {item.shortDescription}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </Grid>
      <Pagination
        count={Math.ceil(startUpsList.length / pageLimit)}
        page={page}
        onChange={(e, page) => handlePageChange(e, page)}
      />
    </Fragment>
  );
}
