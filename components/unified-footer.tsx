"use client"

import Link from "next/link"
import { Mail, Github, Twitter, Linkedin } from "lucide-react"

interface UnifiedFooterProps {
	isAuthenticated?: boolean
}

export function UnifiedFooter({ isAuthenticated = false }: UnifiedFooterProps) {
	return (
			<footer className="border-t border-border px-6 py-8 bg-blue-50 dark:bg-blue-950/30 mt-auto">
			<div className="max-w-6xl mx-auto">
				{isAuthenticated ? (
					<div className="space-y-6">
						{/* Main footer content */}
						<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
							{/* Brand section */}
							<div className="space-y-4">
								<div className="flex items-center gap-2">
									<div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
										<span className="text-primary-foreground font-bold text-sm">S</span>
									</div>
									<span className="font-semibold text-foreground text-lg">Stepable</span>
								</div>
								<p className="text-sm text-muted-foreground leading-relaxed">
									Empowering your learning journey with structured, step-by-step guidance.
								</p>
								<div className="flex items-center gap-3">
									<Link href="mailto:contact@stepable.com" className="text-muted-foreground hover:text-foreground transition-colors">
										<Mail className="w-4 h-4" />
									</Link>
									<Link href="https://github.com/stepable" className="text-muted-foreground hover:text-foreground transition-colors">
										<Github className="w-4 h-4" />
									</Link>
									<Link href="https://twitter.com/stepable" className="text-muted-foreground hover:text-foreground transition-colors">
										<Twitter className="w-4 h-4" />
									</Link>
									<Link href="https://linkedin.com/company/stepable" className="text-muted-foreground hover:text-foreground transition-colors">
										<Linkedin className="w-4 h-4" />
									</Link>
								</div>
							</div>

							{/* Learning section */}
							<div className="space-y-4">
								<h4 className="font-medium text-foreground">Learning</h4>
								<div className="space-y-2">
									<Link href="/journey" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
										My Journey
									</Link>
									<Link href="/projects" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
										Projects
									</Link>
									<Link href="/achievements" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
										Achievements
									</Link>
									<Link href="/progress" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
										Progress
									</Link>
								</div>
							</div>

							{/* Support section */}
							<div className="space-y-4">
								<h4 className="font-medium text-foreground">Support</h4>
								<div className="space-y-2">
									<Link href="/help" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
										Help Center
									</Link>
									<Link href="/contact" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
										Contact Us
									</Link>
									<Link href="/feedback" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
										Feedback
									</Link>
									<Link href="/community" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
										Community
									</Link>
								</div>
							</div>

							{/* Legal section */}
							<div className="space-y-4">
								<h4 className="font-medium text-foreground">Legal</h4>
								<div className="space-y-2">
									<Link href="/privacy" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
										Privacy Policy
									</Link>
									<Link href="/terms" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
										Terms of Service
									</Link>
									<Link href="/cookies" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
										Cookie Policy
									</Link>
									<Link href="/security" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
										Security
									</Link>
								</div>
							</div>
						</div>

						{/* Bottom section */}
						<div className="pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
							<p className="text-sm text-muted-foreground">
								© 2024 Stepable. All rights reserved.
							</p>
							<div className="flex items-center gap-4 text-sm text-muted-foreground">
								<span>Made with ❤️ for learners</span>
								<span>•</span>
								<span>Version 1.0.0</span>
							</div>
						</div>
					</div>
				) : (
					<div className="space-y-6">
						{/* Public footer content */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{/* Brand section */}
							<div className="space-y-4">
								<div className="flex items-center gap-2">
									<div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
										<span className="text-primary-foreground font-bold text-sm">S</span>
									</div>
									<span className="font-semibold text-foreground text-lg">Stepable</span>
								</div>
								<p className="text-sm text-muted-foreground leading-relaxed">
									Transform your learning with our structured, step-by-step approach to mastering new skills.
								</p>
								<div className="flex items-center gap-3">
									<Link href="mailto:hello@stepable.com" className="text-muted-foreground hover:text-foreground transition-colors">
										<Mail className="w-4 h-4" />
									</Link>
									<Link href="https://github.com/stepable" className="text-muted-foreground hover:text-foreground transition-colors">
										<Github className="w-4 h-4" />
									</Link>
									<Link href="https://twitter.com/stepable" className="text-muted-foreground hover:text-foreground transition-colors">
										<Twitter className="w-4 h-4" />
									</Link>
									<Link href="https://linkedin.com/company/stepable" className="text-muted-foreground hover:text-foreground transition-colors">
										<Linkedin className="w-4 h-4" />
									</Link>
								</div>
							</div>

							{/* Product section */}
							<div className="space-y-4">
								<h4 className="font-medium text-foreground">Product</h4>
								<div className="space-y-2">
									<Link href="/features" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
										Features
									</Link>
									<Link href="/pricing" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
										Pricing
									</Link>
									<Link href="/demo" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
										Demo
									</Link>
									<Link href="/about" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
										About Us
									</Link>
								</div>
							</div>

							{/* Support & Legal section */}
							<div className="space-y-4">
								<h4 className="font-medium text-foreground">Support</h4>
								<div className="space-y-2">
									<Link href="/help" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
										Help Center
									</Link>
									<Link href="/contact" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
										Contact
									</Link>
									<Link href="/privacy" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
										Privacy Policy
									</Link>
									<Link href="/terms" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
										Terms of Service
									</Link>
								</div>
							</div>
						</div>

						{/* Bottom section */}
						<div className="pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
							<p className="text-sm text-muted-foreground">
								© 2024 Stepable. All rights reserved.
							</p>
							<div className="flex items-center gap-4 text-sm text-muted-foreground">
								<span>Empowering learners worldwide</span>
							</div>
						</div>
					</div>
				)}
			</div>
		</footer>
	)
}