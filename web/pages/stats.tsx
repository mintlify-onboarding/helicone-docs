import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import BasePageV2 from "../components/shared/layout/basePageV2";
import MetaData from "../components/shared/metaData";
import { RenderBarChart } from "../components/shared/metrics/barChart";
import { Result } from "../lib/result";
import { HeliconeStats } from "./api/stats";

interface HomeProps {}

const Home = (props: HomeProps) => {
  const {} = props;
  const { isLoading, data } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const response = await fetch("/api/stats", {
        next: { revalidate: 1000 },
      });
      return (await response.json()) as Result<HeliconeStats, string>;
    },
  });
  console.log(data);

  return (
    <MetaData title="Home">
      <BasePageV2>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="max-w-3xl mx-auto w-full">
            <h1 className="text-3xl font-bold text-center">
              Active Users/week
            </h1>
            <div className="h-96">
              <RenderBarChart
                data={
                  data?.data?.weeklyActiveUsers
                    .map((v) => ({
                      time_step: new Date(v.time_step),
                      user_count_step: +v.user_count_step,
                    }))
                    .sort(
                      (a, b) => a.time_step.getTime() - b.time_step.getTime()
                    )
                    .map((v) => ({
                      time: v.time_step,
                      value: v.user_count_step,
                    })) ?? []
                }
                timeMap={(v) => v.toLocaleDateString()}
                valueLabel="Active Users"
              />
            </div>
            <h1 className="text-3xl font-bold text-center">Active Users/day</h1>
            <div className="h-96">
              <RenderBarChart
                data={
                  data?.data?.dailyActiveUsers
                    .map((v) => ({
                      time_step: new Date(v.time_step),
                      user_count_step: +v.user_count_step,
                    }))
                    .sort(
                      (a, b) => a.time_step.getTime() - b.time_step.getTime()
                    )
                    .map((v) => ({
                      time: v.time_step,
                      value: v.user_count_step,
                    })) ?? []
                }
                timeMap={(v) => v.toLocaleDateString()}
                valueLabel="Active Users"
              />
            </div>
            <h1 className="text-3xl font-bold text-center">Total Users</h1>
            <div className="h-96">
              <RenderBarChart
                data={
                  data?.data?.integratedUsers
                    .map((v) => ({
                      time_step: new Date(v.time_step),
                      count_step: +v.count_step,
                    }))
                    .sort(
                      (a, b) => a.time_step.getTime() - b.time_step.getTime()
                    )
                    .map((v) => ({
                      time: v.time_step,
                      value: v.count_step,
                    })) ?? []
                }
                timeMap={(v) => v.toLocaleDateString()}
                valueLabel="Total Users"
              />
            </div>
            <h1 className="text-3xl font-bold text-center">User Growth</h1>
            <div className="h-96">
              <RenderBarChart
                data={
                  data?.data?.growthOverTime
                    .map((v) => ({
                      time_step: new Date(v.time_step),
                      count_step: +v.count_step,
                    }))
                    .sort(
                      (a, b) => a.time_step.getTime() - b.time_step.getTime()
                    )
                    .map((v) => ({
                      time: v.time_step,
                      value: v.count_step,
                    })) ?? []
                }
                timeMap={(v) => v.toLocaleDateString()}
                valueLabel="User Count"
              />
            </div>
            <h1 className="text-3xl font-bold text-center">
              Requests week over week
            </h1>
            <div className="h-96">
              <RenderBarChart
                data={
                  data?.data?.weeklyActiveUsers
                    .map((v) => ({
                      time_step: new Date(v.time_step),
                      request_count_step: +v.request_count_step,
                    }))
                    .sort(
                      (a, b) => a.time_step.getTime() - b.time_step.getTime()
                    )
                    .map((v) => ({
                      time: v.time_step,
                      value: v.request_count_step,
                    })) ?? []
                }
                timeMap={(v) => v.toLocaleDateString()}
                valueLabel="Requests"
              />
            </div>
            <h1 className="text-3xl font-bold text-center">
              Requests day by day
            </h1>
            <div className="h-96">
              <RenderBarChart
                data={
                  data?.data?.dailyActiveUsers
                    .map((v) => ({
                      time_step: new Date(v.time_step),
                      request_count_step: +v.request_count_step,
                    }))
                    .sort(
                      (a, b) => a.time_step.getTime() - b.time_step.getTime()
                    )
                    .map((v) => ({
                      time: v.time_step,
                      value: v.request_count_step,
                    })) ?? []
                }
                timeMap={(v) => v.toLocaleDateString()}
                valueLabel="Requests"
              />
            </div>
          </div>
        )}
      </BasePageV2>
    </MetaData>
  );
};

export default Home;
