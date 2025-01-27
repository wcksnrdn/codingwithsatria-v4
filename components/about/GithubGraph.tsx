import { useAnimation, useInView, motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useRef } from "react"
import GitHubCalendar from "react-github-calendar"

export default function GithubGraph() {
  const { resolvedTheme } = useTheme()

  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref)
  const ctrls = useAnimation()

  useEffect(() => {
    if (inView) {
      ctrls.start("visible")
    }
  }, [ctrls, inView])

  const AnimationGithub = {
    hidden: {
      opacity: 0,
      y: `1em`,
    },
    visible: {
      opacity: 1,
      y: `0em`,
      transition: {
        duration: 0.5,
        delay: 1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      initial="hidden"
      animate={ctrls}
      variants={AnimationGithub}
      className="overflow-x-auto w-[400px] md:w-full rounded-xl bg-zinc-200 p-4 dark:bg-zinc-800"
      style={{
        maxWidth: "100%",
        maxHeight: "calc(100vh - 20px)", // Sesuaikan dengan tinggi viewport
        whiteSpace: "nowrap",
      }}
    >
      <div className="inline-block w-full overflow-x-auto"> {/* Ubah dari min-w-[600px] ke w-full */}
        <GitHubCalendar
          username="wcksnrdn"
          labels={{
            totalCount: "{{count}} contributions in the last half year",
          }}
          colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
          showWeekdayLabels
          weekStart={1}
        />
      </div>
    </motion.div>
  )
}
