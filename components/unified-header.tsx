"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut } from "lucide-react"

interface UnifiedHeaderProps {
	isAuthenticated?: boolean
	user?: {
		name: string
		email: string
		avatar?: string
	}
}

export function UnifiedHeader({
	isAuthenticated = false,
	user = {
		name: "Alex Developer",
		email: "alex@company.com",
	},
}: UnifiedHeaderProps) {
	return (
		<nav className="flex items-center justify-between p-6 border-b border-border bg-background">
			<div className="flex items-center gap-2">
				<div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
					<span className="text-primary-foreground font-bold text-sm">S</span>
				</div>
				<Link href={isAuthenticated ? "/dashboard" : "/"} className="text-xl font-bold text-foreground hover:text-primary transition-colors">
					Stepable
				</Link>
			</div>
			
			<div className="flex items-center gap-4">
				{isAuthenticated ? (
					<>
						{/* Authenticated User Menu */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="flex items-center gap-2 p-2 hover:bg-accent">
									<Avatar className="h-8 w-8">
										<AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
										<AvatarFallback>
											{user.name
												.split(" ")
												.map((n) => n[0])
												.join("")}
										</AvatarFallback>
									</Avatar>
									<div className="hidden md:block text-left">
										<div className="text-sm font-medium">{user.name}</div>
										<div className="text-xs text-muted-foreground">{user.email}</div>
									</div>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56">
								<DropdownMenuLabel>My Account</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild>
									<Link href="/profile">
										<User className="mr-2 h-4 w-4" />
										<span>Account Settings</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild>
									<Link href="/auth/logout">
										<LogOut className="mr-2 h-4 w-4" />
										<span>Log out</span>
									</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</>
				) : (
					<>
						{/* Non-authenticated Navigation */}
						<Button 
							variant="ghost" 
							onClick={() => {
								const featuresSection = document.getElementById('features-section')
								featuresSection?.scrollIntoView({ behavior: 'smooth' })
							}}
						>
							Features
						</Button>
						<Link href="/auth/login">
							<Button variant="outline">Sign In</Button>
						</Link>
						<Link href="/auth/register">
							<Button>Get Started</Button>
						</Link>
					</>
				)}
			</div>
		</nav>
	)
}