// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Users, TrendingUp, Globe, Heart } from "lucide-react"

// const impacts = [
//   {
//     icon: Users,
//     title: "Self-Employment",
//     description: "Promotes group-based rural businesses and job creation",
//     stat: "10,000+",
//     label: "Women Empowered",
//   },
//   {
//     icon: TrendingUp,
//     title: "Financial Literacy",
//     description: "Builds digital and financial skills at grassroots level",
//     stat: "95%",
//     label: "Skill Improvement",
//   },
//   {
//     icon: Globe,
//     title: "Scheme Access",
//     description: "Enables confident applications to government programs",
//     stat: "500+",
//     label: "Schemes Matched",
//   },
//   {
//     icon: Heart,
//     title: "Community Impact",
//     description: "Creates sustainable local economic growth",
//     stat: "15",
//     label: "States Covered",
//   },
// ]

// export function Impact() {
//   return (
//     <section className="py-20 bg-gradient-to-b from-purple-50/10 to-background dark:from-purple-950/10">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl lg:text-4xl font-bold mb-4">
//             Creating{" "}
//             <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//               Real Impact
//             </span>
//           </h2>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Empowering women entrepreneurs across rural and semi-urban India
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {impacts.map((impact, index) => (
//             <Card
//               key={index}
//               className="border-purple-200/50 dark:border-purple-800/50 text-center hover:shadow-lg transition-shadow"
//             >
//               <CardHeader>
//                 <div className="p-4 w-fit mx-auto rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 mb-4">
//                   <impact.icon className="h-8 w-8 text-purple-600" />
//                 </div>
//                 <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                   {impact.stat}
//                 </div>
//                 <div className="text-sm text-muted-foreground">{impact.label}</div>
//               </CardHeader>
//               <CardContent>
//                 <CardTitle className="text-lg mb-2">{impact.title}</CardTitle>
//                 <p className="text-muted-foreground text-sm">{impact.description}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }
