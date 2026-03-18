import { motion } from "framer-motion";
import { useMemo, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const getContributionColor = (level: number): string => {
  switch (level) {
    case 0: return "bg-foreground/5";
    case 1: return "bg-accent/30";
    case 2: return "bg-accent/50";
    case 3: return "bg-accent/70";
    case 4: return "bg-accent";
    default: return "bg-foreground/5";
  }
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const BlogProgressBoard = () => {
  const [blogDates, setBlogDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDates = async () => {
      const { data } = await supabase.from("blogs").select("created_at");
      if (data) {
        setBlogDates(data.map(b => new Date(b.created_at).toISOString().split('T')[0]));
      }
      setLoading(false);
    };
    fetchDates();
  }, []);

  const { contributionData, totalContributions, longestStreak, currentStreak } = useMemo(() => {
    const weeks = 52;
    const daysPerWeek = 7;
    const data: number[][] = [];
    const counts: Record<string, number> = {};
    
    // Count posts per day
    blogDates.forEach(date => {
      counts[date] = (counts[date] || 0) + 1;
    });

    let total = blogDates.length;
    let maxStreak = 0;
    let currStreak = 0;
    let tempStreak = 0;

    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - (weeks * daysPerWeek) + 1);

    for (let w = 0; w < weeks; w++) {
      const weekData: number[] = [];
      for (let d = 0; d < daysPerWeek; d++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + (w * 7 + d));
        const dateStr = date.toISOString().split('T')[0];
        const count = counts[dateStr] || 0;
        
        // Level logic: 0 posts = 0, 1 = 2, 2 = 3, 3+ = 4
        const level = count === 0 ? 0 : Math.min(count + 1, 4);
        weekData.push(level);

        // Streak calculation
        if (count > 0) {
          tempStreak++;
        } else {
          if (tempStreak > maxStreak) maxStreak = tempStreak;
          tempStreak = 0;
        }

        // Current streak (checking from most recent backwards)
        if (dateStr === today.toISOString().split('T')[0]) {
           // We'll calculate current streak differently below for accuracy
        }
      }
      data.push(weekData);
    }

    // Accurate Streak Logic (Simplified for this display)
    maxStreak = Math.max(maxStreak, tempStreak);
    
    // Calculate current streak by iterating backwards from today
    let checkDate = new Date();
    while(counts[checkDate.toISOString().split('T')[0]] > 0) {
      currStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }

    return { contributionData: data, totalContributions: total, longestStreak: maxStreak, currentStreak: currStreak };
  }, [blogDates]);

  const startMonth = (new Date().getMonth() - 11 + 12) % 12;

  if (loading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-card/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-foreground/10 mb-12"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <h3 className="text-sm font-medium text-foreground">
          {totalContributions} blog logs in the last year
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((level) => (
              <div key={level} className={`w-2.5 h-2.5 rounded-sm ${getContributionColor(level)}`} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="min-w-[700px]">
          <div className="flex mb-1 ml-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="text-[10px] text-muted-foreground" style={{ width: `${100 / 12}%` }}>
                {months[(startMonth + i) % 12]}
              </div>
            ))}
          </div>

          <div className="flex gap-1">
            <div className="flex flex-col gap-[3px] text-[10px] text-muted-foreground pr-1">
              {days.map((day, i) => (
                <div key={day} className="h-[10px] flex items-center">{i % 2 === 1 ? day.slice(0, 3) : ""}</div>
              ))}
            </div>

            <div className="flex gap-[3px] flex-1">
              {contributionData.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.map((lvl, dIdx) => (
                    <div key={`${wIdx}-${dIdx}`} className={`w-[10px] h-[10px] rounded-sm ${getContributionColor(lvl)} hover:ring-1 hover:ring-accent/50 transition-all`} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-foreground/10 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span>Longest streak: <span className="text-foreground font-medium">{longestStreak} days</span></span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-accent/50" />
          <span>Current streak: <span className="text-foreground font-medium">{currentStreak} days</span></span>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogProgressBoard;
