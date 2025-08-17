
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Pill } from "lucide-react";

export default function MedicineOrder() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Order Medicine</h1>
        <p className="text-muted-foreground">Manage and order your prescriptions.</p>
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="text" placeholder="Search medicines..." />
        <Button type="submit">Search</Button>
      </div>

      <Tabs defaultValue="prescriptions" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="catalog">Catalog</TabsTrigger>
        </TabsList>
        
        <TabsContent value="prescriptions" className="pt-4">
          <div className="health-grid">
            <MedicineCard
              name="Lisinopril 10mg"
              description="Take 1 tablet by mouth daily"
              quantity="30 tablets"
              refills={3}
              doctor="Dr. Emily Chen"
              prescribed="Apr 5, 2025"
            />
            <MedicineCard
              name="Metformin 500mg"
              description="Take 1 tablet by mouth twice daily"
              quantity="60 tablets"
              refills={2}
              doctor="Dr. Emily Chen"
              prescribed="Apr 5, 2025"
            />
            <MedicineCard
              name="Atorvastatin 20mg"
              description="Take 1 tablet by mouth at bedtime"
              quantity="30 tablets"
              refills={5}
              doctor="Dr. James Wilson"
              prescribed="Mar 15, 2025"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="orders" className="pt-4">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">Order #MED-2025-042</CardTitle>
                  <Badge>Shipped</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Placed on Apr 6, 2025</p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex justify-between text-sm">
                    <span>Lisinopril 10mg (30 tablets)</span>
                    <span>$9.99</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Metformin 500mg (60 tablets)</span>
                    <span>$12.99</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t">
                    <span>Total</span>
                    <span>$22.98</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">Track Order</Button>
                <Button variant="ghost" size="sm">View Details</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">Order #MED-2025-036</CardTitle>
                  <Badge>ed</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Placed on Mar 18, 2025</p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex justify-between text-sm">
                    <span>Atorvastatin 20mg (30 tablets)</span>
                    <span>$14.99</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t">
                    <span>Total</span>
                    <span>$14.99</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="ghost" size="sm">View Details</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="catalog" className="pt-4">
          <div className="health-grid">
            {[
              { name: "Acetaminophen 500mg", price: "$8.99", description: "Pain reliever and fever reducer" },
              { name: "Ibuprofen 200mg", price: "$7.49", description: "Anti-inflammatory pain reliever" },
              { name: "Cetirizine 10mg", price: "$12.99", description: "24-hour allergy relief" },
              { name: "Loratadine 10mg", price: "$11.99", description: "Non-drowsy allergy relief" },
              { name: "Omeprazole 20mg", price: "$15.99", description: "Acid reducer for heartburn" },
              { name: "Famotidine 20mg", price: "$9.99", description: "Acid reducer for heartburn and indigestion" }
            ].map((med, i) => (
              <Card key={i} className="medicine-card">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">{med.name}</CardTitle>
                  <p className="text-sm font-medium text-emerald-600">{med.price}</p>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">{med.description}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center mt-8">
        <Button className="flex items-center gap-2">
          <Pill className="h-4 w-4" />
          <span>Order All Prescriptions</span>
        </Button>
      </div>
    </div>
  );
}

interface MedicineCardProps {
  name: string;
  description: string;
  quantity: string;
  refills: number;
  doctor: string;
  prescribed: string;
}

function MedicineCard({
  name,
  description,
  quantity,
  refills,
  doctor,
  prescribed
}: MedicineCardProps) {
  return (
    <Card className="medicine-card">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-base">{name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
        <p className="text-sm">{description}</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <p className="font-medium">Quantity</p>
            <p>{quantity}</p>
          </div>
          <div>
            <p className="font-medium">Refills</p>
            <p>{refills} remaining</p>
          </div>
          <div>
            <p className="font-medium">Doctor</p>
            <p>{doctor}</p>
          </div>
          <div>
            <p className="font-medium">Prescribed</p>
            <p>{prescribed}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm">
          Refill
        </Button>
        <Button variant="ghost" size="sm">
          Details
        </Button>
      </CardFooter>
    </Card>
  );
}
