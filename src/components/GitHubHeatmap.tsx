import { motion } from "framer-motion";
import { useMemo } from "react";

// Generate mock contribution data for the last 52 weeks
const generateContributionData = () => {
  const weeks = 52;
  const daysPerWeek = 7;
  const data: number[][] = [];
  
  for (let week = 0; week < weeks; week++) {
    const weekData: number[] = [];
    for (let day = 0; day < daysPerWeek; day++) {
      // Generate realistic contribution patterns
      // More activity on weekdays, less on weekends
      const isWeekend = day === 0 || day === 6;
      const baseChance = isWeekend ? 0.2 : 0.5;
      
      // Recent weeks have more activity
      const recencyBoost = week > 40 ? 0.3 : 0;
      
      if (Math.random() < baseChance + recencyBoost) {
        // Random contribution count (0-4 levels)
        const level = Math.floor(Math.random() * 5);
        weekData.push(level);
      } else {
        weekData.push(0);
      }
    }
    data.push(weekData);
  }
  
  return data;
};

const getContributionColor = (level: number): string => {
  switch (level) {
    case 0:
      return "bg-foreground/5";
    case 1:
      return "bg-accent/30";
    case 2:
      return "bg-accent/50";
    case 3:
      return "bg-accent/70";
    case 4:
      return "bg-accent";
    default:
      return "bg-foreground/5";
  }
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const GitHubHeatmap = () => {
  const contributionData = useMemo(() => generateContributionData(), []);
  
  // Calculate total contributions
  const totalContributions = useMemo(() => {
    return contributionData.reduce((total, week) => {
      return total + week.reduce((weekTotal, day) => weekTotal + day, 0);
    }, 0);
  }, [contributionData]);

  // Get current month index for label positioning
  const currentDate = new Date();
  const startMonth = (currentDate.getMonth() - 11 + 12) % 12;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="w-full bg-card/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-foreground/10"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <h3 className="text-sm font-medium text-foreground">
          {totalContributions} contributions in the last year
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-2.5 h-2.5 rounded-sm ${getContributionColor(level)}`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Heatmap Container */}
      <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
        <div className="min-w-[700px]">
          {/* Month labels */}
          <div className="flex mb-1 ml-8">
            {Array.from({ length: 12 }).map((_, i) => {
              const monthIndex = (startMonth + i) % 12;
              return (
                <div
                  key={i}
                  className="text-[10px] text-muted-foreground"
                  style={{ width: `${100 / 12}%` }}
                >
                  {months[monthIndex]}
                </div>
              );
            })}
          </div>

          {/* Grid with day labels */}
          <div className="flex gap-1">
            {/* Day labels */}
            <div className="flex flex-col gap-[3px] text-[10px] text-muted-foreground pr-1">
              {days.map((day, i) => (
                <div key={day} className="h-[10px] flex items-center">
                  {i % 2 === 1 ? day.slice(0, 3) : ""}
                </div>
              ))}
            </div>

            {/* Contribution grid */}
            <div className="flex gap-[3px] flex-1">
              {contributionData.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[3px]">
                  {week.map((contribution, dayIndex) => (
                    <motion.div
                      key={`${weekIndex}-${dayIndex}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.5 + (weekIndex * 7 + dayIndex) * 0.001,
                        duration: 0.2,
                      }}
                      className={`w-[10px] h-[10px] rounded-sm ${getContributionColor(
                        contribution
                      )} hover:ring-1 hover:ring-accent/50 transition-all cursor-pointer`}
                      title={`${contribution} contribution${contribution !== 1 ? "s" : ""}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity summary */}
      <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-foreground/10 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span>Longest streak: <span className="text-foreground font-medium">7 days</span></span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-accent/50" />
          <span>Current streak: <span className="text-foreground font-medium">3 days</span></span>
        </div>
      </div>
    </motion.div>
  );
};

export default GitHubHeatmap;
