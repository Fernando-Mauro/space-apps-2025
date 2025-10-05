import { Github } from "lucide-react"

export function GithubSection() {
    return (
        <section className="bg-background py-16 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="flex flex-col items-center justify-center gap-6 rounded-lg border border-border bg-card p-8 text-center md:p-12">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-foreground">
                        <img src="/logo-1.svg" className="h-12 w-12" alt="" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold md:text-3xl">View on GitHub</h2>
                        <p className="text-muted-foreground max-w-2xl">
                            Explore the source code for this Mars 2020 Perseverance Rover project. Contributions and feedback are
                            welcome.
                        </p>
                    </div>

                    <button className="group">
                        <a
                            href="https://github.com/yourusername/mars-rover-project"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                        >
                            <Github className="h-5 w-5" />
                            View Repository
                            <svg
                                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </button>
                </div>
            </div>
        </section>
    )
}
