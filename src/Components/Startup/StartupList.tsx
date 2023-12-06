import { Fragment, ReactElement, useState, useEffect } from "react";
import { Startup } from "../../Types/Startup";
import { Card, CardContent, Typography } from "@mui/material";
import { StartupHttpService } from "../../Http/Startup/Startup.http.service";

export default function StartupList(): ReactElement {
  const [startUpsList, setStartUpsList] = useState<Startup[]>([]);

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

  return (
    <Fragment>
      {startUpsList.map((item: any) => {
        return (
          <Card variant="outlined" sx={{ m: 2 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {item.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Founded:{new Date(item.dateFounded).getFullYear()} | Employees{" "}
                {item.employees} | {item.totalFunding} |{" "}
                {item.currentInvestmentStage}
              </Typography>
              <Typography variant="body2">{item.shortDescription}</Typography>
            </CardContent>
          </Card>
        );
      })}
    </Fragment>
  );
}
