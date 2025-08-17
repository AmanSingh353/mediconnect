import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    location: "City Medical Center",
    distance: "0.8 miles",
    rating: 4.9,
    reviews: 124,
    availability: "Next Available: Today"
  },
  {
    id: 2,
    name: "Dr. Michael Brown",
    specialty: "Family Medicine",
    location: "Community Health Partners",
    distance: "1.2 miles",
    rating: 4.7,
    reviews: 98,
    availability: "Next Available: Tomorrow"
  },
  {
    id: 3,
    name: "Dr. Emily Chen",
    specialty: "Endocrinology",
    location: "Diabetes Care Center",
    distance: "1.5 miles",
    rating: 4.8,
    reviews: 86,
    availability: "Next Available: May 6"
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Internal Medicine",
    location: "Wellness Medical Group",
    distance: "1.9 miles",
    rating: 4.6,
    reviews: 112,
    availability: "Next Available: May 8"
  },
  {
    id: 5,
    name: "Dr. Maria Rodriguez",
    specialty: "Neurology",
    location: "Neuroscience Institute",
    distance: "2.3 miles",
    rating: 4.9,
    reviews: 76,
    availability: "Next Available: May 10"
  }
];

export default function NearbyDoctors() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Nearby Doctors</h1>
        <p className="text-muted-foreground">Find and schedule appointments with doctors in your area.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Input type="text" placeholder="Search doctors..." />
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Specialty" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Specialties</SelectItem>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="endocrinology">Endocrinology</SelectItem>
              <SelectItem value="family-medicine">Family Medicine</SelectItem>
              <SelectItem value="internal-medicine">Internal Medicine</SelectItem>
              <SelectItem value="neurology">Neurology</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Distance" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="any">Any Distance</SelectItem>
              <SelectItem value="1">Within 1 mile</SelectItem>
              <SelectItem value="5">Within 5 miles</SelectItem>
              <SelectItem value="10">Within 10 miles</SelectItem>
              <SelectItem value="25">Within 25 miles</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 bg-muted p-6 flex items-center justify-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-medium text-primary">
                    {doctor.name.split(' ')[1][0]}
                    {doctor.name.split(' ')[0][0]}
                  </span>
                </div>
              </div>
              <div className="p-6 md:w-3/4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{doctor.name}</h3>
                    <p className="text-muted-foreground">{doctor.specialty}</p>
                  </div>
                  <div className="flex items-center mt-2 md:mt-0">
                    <div className="flex items-center mr-4">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
                      <span className="font-medium">{doctor.rating}</span>
                      <span className="text-muted-foreground text-sm ml-1">({doctor.reviews})</span>
                    </div>
                    <Badge variant="outline" className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {doctor.distance}
                    </Badge>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                    {doctor.location}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
                  <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                    {doctor.availability}
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View Profile</Button>
                    <Button size="sm">Book Appointment</Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
