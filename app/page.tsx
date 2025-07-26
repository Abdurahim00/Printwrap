"use client"

import { useState, createContext, useContext, useMemo, useRef } from "react"
import Image from "next/image"
import {
  ShoppingCart,
  CreditCard,
  Palette,
  Languages,
  LogOut,
  LogIn,
  UserPlus,
  LayoutDashboard,
  Trash2,
  Plus,
  Minus,
  Upload,
  RotateCw,
  Download,
  Users,
  Package,
  FileText,
  Truck,
  Edit3,
  Search,
  SwatchBookIcon,
  ShoppingCartIcon as KlarnaLogoIcon,
  Move,
  Maximize,
  ImportIcon as FileImport,
  ShieldCheck,
  MapPin,
  FileArchive,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

// Mock Data & Translations
const translations = {
  en: {
    // Homepage & General
    platformName: "PrintWrap Pro",
    homepageTitle: "Your Vision, Expertly Printed & Wrapped.",
    homepageSubtitle:
      "High-quality custom prints and professional car wrapping services in Sweden. Inspired by Vistaprint, powered by innovation.",
    startDesigning: "Start Designing",
    login: "Login",
    signup: "Sign Up",
    viewProducts: "View Products",
    products: "Products",
    dashboard: "Dashboard",
    cart: "Cart",
    checkout: "Checkout",
    logout: "Logout",
    allCategories: "All Categories",
    vat: "VAT (25%)",
    shipping: "Shipping",
    total: "Total",
    price: "Price",
    quantity: "Quantity",
    language: "Language",
    // User Accounts
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    customerNumber: "Customer Number",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",
    // Dashboards
    clientDashboard: "Client Dashboard",
    savedDesigns: "Saved Designs",
    orderHistory: "Order History",
    billingShippingInfo: "Billing & Shipping Info",
    adminDashboard: "Admin Dashboard",
    manageUsers: "Manage Users",
    manageProductsPrices: "Manage Products & Prices",
    operationsDashboard: "Operations Dashboard",
    activeOrdersQueue: "Active Orders Queue",
    // Design Tool
    designTool: "Design Tool",
    uploadImage: "Upload Image (JPG, PNG, SVG)",
    addText: "Add Text",
    textProperties: "Text Properties",
    font: "Font",
    color: "Color",
    size: "Size",
    imageProperties: "Image Properties",
    dragResizeRotate: "Drag, Resize, Rotate",
    importDesign: "Import Design (PDF/AI)",
    previewExport: "Preview & Export",
    downloadPNG: "Download PNG",
    downloadPDF: "Download PDF",
    canvasArea: "Design Canvas",
    // Car Wrap
    carWrapDesigner: "Car Wrap Designer",
    enterLicensePlate: "Enter Swedish License Plate",
    findVehicle: "Find Vehicle",
    vehicleMockup: "Vehicle Mockup",
    applyDesignToWrap: "Apply Design to Wrap",
    bleedGuidelines: "Bleed Guidelines",
    // Products & Ordering
    productCategories: "Product Categories",
    flyers: "Flyers",
    businessCards: "Business Cards",
    stickers: "Stickers",
    carWraps: "Car Wraps",
    decals: "Decals",
    apparel: "Apparel",
    promotionalItems: "Promotional Items",
    addToCart: "Add to Cart",
    shippingOptions: "Shipping Options",
    standardShipping: "Standard (5-7 days)",
    expressShipping: "Express (2-3 days)",
    paymentMethod: "Payment Method",
    payWithSwish: "Pay with Swish",
    payWithCard: "Pay with Card",
    payWithKlarna: "Pay with Klarna",
    payNow: "Pay Now",
    orderConfirmation: "Order Confirmation",
    thankYouForOrder: "Thank you for your order!",
    orderSummaryEmail: "A summary of your order and a PDF proof (simulated) has been sent to your email.",
    backToHome: "Back to Home",
    // Admin Specific
    addNewProduct: "Add New Product",
    productName: "Product Name",
    category: "Category",
    actions: "Actions",
    edit: "Edit",
    delete: "Delete",
    userRole: "Role",
    // Operations Specific
    orderId: "Order ID",
    customer: "Customer",
    date: "Date",
    status: "Status",
    updateStatus: "Update Status",
    exportPrintFile: "Export Print File",
    // Billing/Shipping
    fullName: "Full Name",
    address: "Address",
    city: "City",
    postalCode: "Postal Code",
    country: "Country",
    phone: "Phone",
    saveInfo: "Save Information",
  },
  sv: {
    // Homepage & General
    platformName: "PrintWrap Pro",
    homepageTitle: "Din Vision, Expertmässigt Tryckt & Folierad.",
    homepageSubtitle:
      "Högkvalitativa anpassade tryck och professionella bilfolieringstjänster i Sverige. Inspirerad av Vistaprint, driven av innovation.",
    startDesigning: "Börja Designa",
    login: "Logga In",
    signup: "Registrera Dig",
    viewProducts: "Visa Produkter",
    products: "Produkter",
    dashboard: "Kontrollpanel",
    cart: "Varukorg",
    checkout: "Kassa",
    logout: "Logga Ut",
    allCategories: "Alla Kategorier",
    vat: "Moms (25%)",
    shipping: "Frakt",
    total: "Totalt",
    price: "Pris",
    quantity: "Antal",
    language: "Språk",
    // User Accounts
    email: "E-post",
    password: "Lösenord",
    confirmPassword: "Bekräfta Lösenord",
    customerNumber: "Kundnummer",
    alreadyHaveAccount: "Har du redan ett konto?",
    dontHaveAccount: "Har du inget konto?",
    // Dashboards
    clientDashboard: "Kundpanel",
    savedDesigns: "Sparade Designer",
    orderHistory: "Orderhistorik",
    billingShippingInfo: "Fakturerings- & Leveransinfo",
    adminDashboard: "Adminpanel",
    manageUsers: "Hantera Användare",
    manageProductsPrices: "Hantera Produkter & Priser",
    operationsDashboard: "Driftpanel",
    activeOrdersQueue: "Aktiva Beställningar",
    // Design Tool
    designTool: "Designverktyg",
    uploadImage: "Ladda Upp Bild (JPG, PNG, SVG)",
    addText: "Lägg Till Text",
    textProperties: "Textegenskaper",
    font: "Typsnitt",
    color: "Färg",
    size: "Storlek",
    imageProperties: "Bildegenskaper",
    dragResizeRotate: "Dra, Ändra Storlek, Rotera",
    importDesign: "Importera Design (PDF/AI)",
    previewExport: "Förhandsgranska & Exportera",
    downloadPNG: "Ladda Ner PNG",
    downloadPDF: "Ladda Ner PDF",
    canvasArea: "Designyta",
    // Car Wrap
    carWrapDesigner: "Bilfolieringsdesigner",
    enterLicensePlate: "Ange Svenskt Registreringsnummer",
    findVehicle: "Hitta Fordon",
    vehicleMockup: "Fordonsmockup",
    applyDesignToWrap: "Applicera Design på Foliering",
    bleedGuidelines: "Utfallslinjer",
    // Products & Ordering
    productCategories: "Produktkategorier",
    flyers: "Flygblad",
    businessCards: "Visitkort",
    stickers: "Klistermärken",
    carWraps: "Bilfoliering",
    decals: "Dekaler",
    apparel: "Kläder",
    promotionalItems: "Reklamartiklar",
    addToCart: "Lägg Till i Varukorg",
    shippingOptions: "Fraktalternativ",
    standardShipping: "Standard (5-7 dagar)",
    expressShipping: "Express (2-3 dagar)",
    paymentMethod: "Betalningsmetod",
    payWithSwish: "Betala med Swish",
    payWithCard: "Betala med Kort",
    payWithKlarna: "Betala med Klarna",
    payNow: "Betala Nu",
    orderConfirmation: "Orderbekräftelse",
    thankYouForOrder: "Tack för din beställning!",
    orderSummaryEmail:
      "En sammanfattning av din beställning och en PDF-korrektur (simulerad) har skickats till din e-post.",
    backToHome: "Tillbaka till Startsidan",
    // Admin Specific
    addNewProduct: "Lägg Till Ny Produkt",
    productName: "Produktnamn",
    category: "Kategori",
    actions: "Åtgärder",
    edit: "Redigera",
    delete: "Ta Bort",
    userRole: "Roll",
    // Operations Specific
    orderId: "Order-ID",
    customer: "Kund",
    date: "Datum",
    status: "Status",
    updateStatus: "Uppdatera Status",
    exportPrintFile: "Exportera Tryckfil",
    // Billing/Shipping
    fullName: "Fullständigt Namn",
    address: "Adress",
    city: "Stad",
    postalCode: "Postnummer",
    country: "Land",
    phone: "Telefon",
    saveInfo: "Spara Information",
  },
}

const mockUsers = [
  { id: 1, email: "client@example.com", password: "password", role: "client", customerNumber: "CUST-84371" },
  { id: 2, email: "admin@example.com", password: "password", role: "admin", customerNumber: "ADMIN-00001" },
  { id: 3, email: "ops@example.com", password: "password", role: "operations", customerNumber: "OPS-00001" },
]

const productCategories = [
  { id: "all", name: (t) => t.allCategories },
  { id: "flyers", name: (t) => t.flyers },
  { id: "business-cards", name: (t) => t.businessCards },
  { id: "stickers", name: (t) => t.stickers },
  { id: "car-wraps", name: (t) => t.carWraps },
  { id: "decals", name: (t) => t.decals },
  { id: "apparel", name: (t) => t.apparel },
  { id: "promotional-items", name: (t) => t.promotionalItems },
]

const mockProducts = [
  { id: 1, name: "Premium Business Cards", price: 499, image: "/product-bizcard.jpg", categoryId: "business-cards" },
  { id: 2, name: "A5 Flyers - Glossy", price: 799, image: "/product-flyer.jpg", categoryId: "flyers" },
  { id: 3, name: "Vinyl Sticker Sheet", price: 249, image: "/product-sticker.jpg", categoryId: "stickers" },
  { id: 4, name: "Full Car Wrap - Sedan", price: 25000, image: "/product-carwrap.jpg", categoryId: "car-wraps" },
  { id: 5, name: "Custom T-Shirt Print", price: 350, image: "/product-tshirt.jpg", categoryId: "apparel" },
  { id: 6, name: "Promotional Mugs", price: 180, image: "/product-mug.jpg", categoryId: "promotional-items" },
  { id: 7, name: "A3 Posters - Matte", price: 399, image: "/product-poster.jpg", categoryId: "flyers" }, // Example of posters in flyers category
  { id: 8, name: "Outdoor Vinyl Banner", price: 1200, image: "/product-banner.jpg", categoryId: "promotional-items" },
  { id: 9, name: "Custom Hoodie Print", price: 550, image: "/product-hoodie.jpg", categoryId: "apparel" },
  { id: 10, name: "Laptop Decals", price: 150, image: "/product-decal.jpg", categoryId: "decals" },
  { id: 11, name: "Partial Car Wrap - Van", price: 10000, image: "/product-carwrap.jpg", categoryId: "car-wraps" },
]

const mockOrders = [
  {
    id: "ORD-001",
    customer: "CUST-84371",
    date: "2025-06-01",
    total: 25000,
    status: "In Production",
    items: [{ name: "Full Car Wrap", quantity: 1 }],
  },
  {
    id: "ORD-002",
    customer: "CUST-12345",
    date: "2025-06-02",
    total: 799,
    status: "Printing",
    items: [{ name: "A5 Flyers", quantity: 500 }],
  },
  {
    id: "ORD-003",
    customer: "CUST-67890",
    date: "2025-06-03",
    total: 499,
    status: "Queued",
    items: [{ name: "Business Cards", quantity: 250 }],
  },
]

const mockDesigns = [
  { id: 1, name: "My Awesome Car Design", type: "Car Wrap", preview: "/placeholder.svg?width=100&height=60" },
  { id: 2, name: "Company Business Card v2", type: "Business Cards", preview: "/placeholder.svg?width=100&height=60" },
  { id: 3, name: "Summer Fest Flyer", type: "Flyer", preview: "/placeholder.svg?width=100&height=60" },
]

const carDatabase = {
  "ABC 123": { make: "Volvo", model: "V60", svgPath: "/car-volvo.png" },
  "DEF 456": { make: "Saab", model: "9-3", svgPath: "/car-saab.png" },
  "GHI 789": { make: "Tesla", model: "Model Y", svgPath: "/car-tesla.png" },
}

const fonts = ["Arial", "Verdana", "Times New Roman", "Courier New", "Georgia", "Impact"]
const colors = ["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"]

// App Context
const AppContext = createContext(null)
const useAppContext = () => useContext(AppContext)

// Main App Component
export default function PrintShopPlatform() {
  const [page, setPage] = useState("home")
  const [user, setUser] = useState(null)
  const [lang, setLang] = useState("en")
  const [cart, setCart] = useState([])
  const [uploadedDesignForCar, setUploadedDesignForCar] = useState(null) // URL of uploaded image for car mockup

  const t = useMemo(() => translations[lang], [lang])

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
    } else {
      setCart((prevCart) => prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item)))
    }
  }

  const logout = () => {
    setUser(null)
    setPage("home")
    setCart([])
    setUploadedDesignForCar(null)
  }

  const contextValue = {
    page,
    setPage,
    user,
    setUser,
    lang,
    setLang,
    t,
    cart,
    setCart,
    addToCart,
    updateQuantity,
    logout,
    uploadedDesignForCar,
    setUploadedDesignForCar,
  }

  const renderPage = () => {
    if (page === "home") return <HomePage />
    if (page === "login") return <LoginPage />
    if (page === "signup") return <SignupPage />
    if (page === "dashboard") return <DashboardPage />
    if (page === "products") return <ProductsPage />
    if (page === "cart") return <CartPage />
    if (page === "checkout") return <CheckoutPage />
    if (page === "confirmation") return <OrderConfirmationPage />
    if (page === "design-tool") return <DesignToolPage />
    if (page === "car-mockup") return <CarMockupPage />
    return <HomePage />
  }

  return (
    <AppContext.Provider value={contextValue}>
      <div
        className={`min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 text-slate-800 dark:from-slate-900 dark:to-slate-800 dark:text-slate-200 font-sans`}
      >
        <NavBar />
        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">{renderPage()}</main>
        <Footer />
      </div>
    </AppContext.Provider>
  )
}

// --- UI COMPONENTS ---

function NavBar() {
  const { user, setPage, logout, t, lang, setLang, platformName } = useAppContext()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPage("home")}>
          <Palette className="h-8 w-8 text-sky-600 dark:text-sky-500" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t.platformName}</h1>
        </div>
        <nav className="hidden md:flex items-center gap-1">
          <Button variant="ghost" onClick={() => setPage("products")}>
            {t.products}
          </Button>
          <Button variant="ghost" onClick={() => setPage("design-tool")}>
            {t.designTool}
          </Button>
          <Button variant="ghost" onClick={() => setPage("car-mockup")}>
            {t.carWrapDesigner}
          </Button>
        </nav>
        <div className="flex items-center gap-2">
          <Select value={lang} onValueChange={setLang}>
            <SelectTrigger className="w-[120px]">
              <Languages className="h-4 w-4 mr-2" />
              <SelectValue placeholder={t.language} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="sv">Svenska</SelectItem>
            </SelectContent>
          </Select>
          {user ? (
            <>
              <Button variant="ghost" onClick={() => setPage("dashboard")} className="hidden sm:inline-flex">
                <LayoutDashboard className="mr-2 h-4 w-4" /> {t.dashboard}
              </Button>
              <Button variant="outline" onClick={() => setPage("cart")}>
                <ShoppingCart className="mr-0 sm:mr-2 h-4 w-4" /> <span className="hidden sm:inline">{t.cart}</span>
              </Button>
              <Button onClick={logout} variant="secondary">
                <LogOut className="mr-0 sm:mr-2 h-4 w-4" /> <span className="hidden sm:inline">{t.logout}</span>
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setPage("login")}>
                <LogIn className="mr-2 h-4 w-4" /> {t.login}
              </Button>
              <Button onClick={() => setPage("signup")} className="bg-sky-600 hover:bg-sky-700 text-white">
                <UserPlus className="mr-2 h-4 w-4" /> {t.signup}
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

function Footer() {
  const { t } = useAppContext()
  return (
    <footer className="border-t border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-600 dark:text-slate-400">
        <p>
          &copy; {new Date().getFullYear()} {t.platformName}. All rights reserved.
        </p>
        <p className="mt-1">Inspired by Vistaprint.se - Demo for Stakeholders</p>
      </div>
    </footer>
  )
}

function HomePage() {
  const { setPage, t } = useAppContext()
  return (
    <div className="text-center flex flex-col items-center justify-center py-12 md:py-24">
      <Badge
        variant="secondary"
        className="mb-4 bg-sky-100 text-sky-700 border-sky-300 dark:bg-sky-900 dark:text-sky-300 dark:border-sky-700"
      >
        {t.platformName}
      </Badge>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-white">
        {t.homepageTitle}
      </h1>
      <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10">
        {t.homepageSubtitle}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          size="lg"
          onClick={() => setPage("design-tool")}
          className="bg-sky-600 hover:bg-sky-700 text-white shadow-lg"
        >
          <Palette className="mr-2 h-5 w-5" /> {t.startDesigning}
        </Button>
        <Button size="lg" variant="outline" onClick={() => setPage("products")} className="shadow-lg">
          <Package className="mr-2 h-5 w-5" /> {t.viewProducts}
        </Button>
      </div>
    </div>
  )
}

function AuthFormCard({ title, children, footerContent }) {
  return (
    <div className="flex justify-center items-center py-12">
      <Card className="w-full max-w-md shadow-xl bg-white dark:bg-slate-800">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
        {footerContent && <CardFooter className="text-center text-sm justify-center">{footerContent}</CardFooter>}
      </Card>
    </div>
  )
}

function LoginPage() {
  const { setUser, setPage, t } = useAppContext()
  const [email, setEmail] = useState("client@example.com")
  const [password, setPassword] = useState("password")
  const [error, setError] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    const foundUser = mockUsers.find((u) => u.email === email && u.password === password)
    if (foundUser) {
      setUser(foundUser)
      setPage("dashboard")
    } else {
      setError("Invalid email or password. Try client@example.com / password")
    }
  }

  return (
    <AuthFormCard
      title={t.login}
      footerContent={
        <p>
          {t.dontHaveAccount}{" "}
          <Button
            variant="link"
            className="p-0 text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-500"
            onClick={() => setPage("signup")}
          >
            {t.signup}
          </Button>
        </p>
      }
    >
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="email">{t.email}</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">{t.password}</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white">
          {t.login}
        </Button>
      </form>
    </AuthFormCard>
  )
}

function SignupPage() {
  const { setUser, setPage, t } = useAppContext()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const handleSignup = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    if (mockUsers.find((u) => u.email === email)) {
      setError("User with this email already exists")
      return
    }

    const customerNumber = `CUST-${Math.floor(10000 + Math.random() * 90000)}`
    const newUser = { id: mockUsers.length + 1, email, password, role: "client", customerNumber }
    mockUsers.push(newUser) // Simulate API
    setUser(newUser)
    setPage("dashboard")
  }

  return (
    <AuthFormCard
      title={t.signup}
      footerContent={
        <p>
          {t.alreadyHaveAccount}{" "}
          <Button
            variant="link"
            className="p-0 text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-500"
            onClick={() => setPage("login")}
          >
            {t.login}
          </Button>
        </p>
      }
    >
      <form onSubmit={handleSignup} className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="email-signup">{t.email}</Label>
          <Input
            id="email-signup"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password-signup">{t.password}</Label>
          <Input
            id="password-signup"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="confirm-password-signup">{t.confirmPassword}</Label>
          <Input
            id="confirm-password-signup"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white">
          {t.signup}
        </Button>
      </form>
    </AuthFormCard>
  )
}

function DashboardPage() {
  const { user, t } = useAppContext()

  const renderDashboardContent = () => {
    switch (user?.role) {
      case "client":
        return <ClientDashboard />
      case "admin":
        return <AdminDashboard />
      case "operations":
        return <OperationsDashboard />
      default:
        return <p>No dashboard available for your role.</p>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white dark:bg-slate-800 shadow rounded-lg">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t.dashboard}</h1>
          <p className="text-slate-600 dark:text-slate-400">Welcome back, {user?.email}!</p>
        </div>
        <div className="text-right text-sm">
          <p className="font-semibold text-slate-700 dark:text-slate-300">{t.customerNumber}:</p>
          <p className="text-slate-500 dark:text-slate-400">{user?.customerNumber}</p>
        </div>
      </div>
      {renderDashboardContent()}
    </div>
  )
}

function ClientDashboard() {
  const { t } = useAppContext()
  return (
    <Tabs defaultValue="orders" className="w-full">
      <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
        <TabsTrigger value="orders">
          <FileText className="mr-2 h-4 w-4" />
          {t.orderHistory}
        </TabsTrigger>
        <TabsTrigger value="designs">
          <Palette className="mr-2 h-4 w-4" />
          {t.savedDesigns}
        </TabsTrigger>
        <TabsTrigger value="billing">
          <MapPin className="mr-2 h-4 w-4" />
          {t.billingShippingInfo}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="orders" className="mt-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>{t.orderHistory}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.orderId}</TableHead>
                  <TableHead>{t.date}</TableHead>
                  <TableHead>{t.status}</TableHead>
                  <TableHead className="text-right">{t.total}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOrders
                  .filter((o) => o.customer === "CUST-84371")
                  .map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Badge variant={order.status === "Completed" ? "default" : "secondary"}>{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">{order.total} SEK</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="designs" className="mt-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>{t.savedDesigns}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockDesigns.map((design) => (
              <Card key={design.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <Image
                  src={design.preview || "/placeholder.svg"}
                  alt={design.name}
                  width={300}
                  height={180}
                  className="w-full h-32 object-cover"
                />
                <CardContent className="p-4">
                  <p className="font-semibold">{design.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{design.type}</p>
                  <Button variant="outline" size="sm" className="mt-2 w-full">
                    {t.edit}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="billing" className="mt-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>{t.billingShippingInfo}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="fullName">{t.fullName}</Label>
                <Input id="fullName" defaultValue="Test Testsson" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone">{t.phone}</Label>
                <Input id="phone" defaultValue="+46 70 123 45 67" />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="address-client">{t.address}</Label>
              <Input id="address-client" defaultValue="Storgatan 1" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <Label htmlFor="city-client">{t.city}</Label>
                <Input id="city-client" defaultValue="Stockholm" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="postalCode-client">{t.postalCode}</Label>
                <Input id="postalCode-client" defaultValue="111 22" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="country-client">{t.country}</Label>
                <Input id="country-client" defaultValue="Sweden" />
              </div>
            </div>
            <Button className="bg-sky-600 hover:bg-sky-700 text-white">{t.saveInfo}</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

function AdminDashboard() {
  const { t } = useAppContext()
  return (
    <Tabs defaultValue="users" className="w-full">
      <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2">
        <TabsTrigger value="users">
          <Users className="mr-2 h-4 w-4" />
          {t.manageUsers}
        </TabsTrigger>
        <TabsTrigger value="products">
          <Package className="mr-2 h-4 w-4" />
          {t.manageProductsPrices}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="users" className="mt-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>{t.manageUsers}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>{t.email}</TableHead>
                  <TableHead>{t.userRole}</TableHead>
                  <TableHead>{t.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.customerNumber}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === "admin" ? "destructive" : "outline"}>{user.role}</Badge>
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit3 className="mr-1 h-3 w-3" />
                        {t.edit}
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="mr-1 h-3 w-3" />
                        {t.delete}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="products" className="mt-6">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t.manageProductsPrices}</CardTitle>
            <Button className="bg-sky-600 hover:bg-sky-700 text-white">
              <Plus className="mr-2 h-4 w-4" />
              {t.addNewProduct}
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>{t.productName}</TableHead>
                  <TableHead>{t.category}</TableHead>
                  <TableHead>{t.price}</TableHead>
                  <TableHead>{t.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProducts.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.id}</TableCell>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>
                      {productCategories.find((c) => c.id === p.categoryId)?.name(t) || p.categoryId}
                    </TableCell>
                    <TableCell>{p.price} SEK</TableCell>
                    <TableCell className="space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit3 className="mr-1 h-3 w-3" />
                        {t.edit}
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="mr-1 h-3 w-3" />
                        {t.delete}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

function OperationsDashboard() {
  const { t } = useAppContext()
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>{t.activeOrdersQueue}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.orderId}</TableHead>
              <TableHead>{t.customer}</TableHead>
              <TableHead>{t.date}</TableHead>
              <TableHead>{t.status}</TableHead>
              <TableHead>{t.updateStatus}</TableHead>
              <TableHead>{t.exportPrintFile}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge>{order.status}</Badge>
                </TableCell>
                <TableCell>
                  <Select defaultValue={order.status}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={t.updateStatus} />
                    </SelectTrigger>
                    <SelectContent>
                      {["Queued", "Printing", "In Production", "Shipped", "Completed"].map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => alert(`Simulating export for order ${order.id}`)}>
                    <FileArchive className="mr-2 h-4 w-4" /> {t.exportPrintFile}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function ProductsPage() {
  const { addToCart, t } = useAppContext()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = mockProducts.filter(
    (p) =>
      (selectedCategory === "all" || p.categoryId === selectedCategory) &&
      p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">{t.products}</h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
          Browse our extensive catalog of customizable products.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full md:w-1/3">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10"
            icon={<Search className="h-4 w-4 text-slate-400" />}
          />
        </div>
        <div className="w-full md:w-2/3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder={t.productCategories} />
            </SelectTrigger>
            <SelectContent>
              {productCategories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name(t)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <CardContent className="p-4 flex-grow flex flex-col">
                <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">{product.name}</h3>
                <p className="text-sky-600 dark:text-sky-400 font-medium mt-1">{product.price} SEK</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {productCategories.find((c) => c.id === product.categoryId)?.name(t)}
                </p>
              </CardContent>
              <CardFooter className="p-4 border-t dark:border-slate-700">
                <Button className="w-full bg-sky-600 hover:bg-sky-700 text-white" onClick={() => addToCart(product)}>
                  <ShoppingCart className="mr-2 h-4 w-4" /> {t.addToCart}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-500 dark:text-slate-400 py-10">
          No products found matching your criteria.
        </p>
      )}
    </div>
  )
}

function CartPage() {
  const { cart, updateQuantity, setPage, t } = useAppContext()
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const vatAmount = subtotal * 0.25
  const cartTotal = subtotal + vatAmount

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingCart className="mx-auto h-16 w-16 text-slate-400 dark:text-slate-500 mb-4" />
        <h1 className="text-3xl font-bold mb-4">{t.cart}</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">Your cart is currently empty.</p>
        <Button onClick={() => setPage("products")} className="bg-sky-600 hover:bg-sky-700 text-white">
          Browse Products
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center">{t.cart}</h1>
      <Card className="shadow-xl">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-2/5">{t.products}</TableHead>
                <TableHead>{t.price}</TableHead>
                <TableHead className="text-center w-1/5">{t.quantity}</TableHead>
                <TableHead className="text-right">{t.total}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium flex items-center gap-3">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={60}
                      height={45}
                      className="rounded-md object-cover"
                    />
                    {item.name}
                  </TableCell>
                  <TableCell>{item.price} SEK</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1 sm:gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 sm:h-9 sm:w-9"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        readOnly
                        className="w-12 h-8 sm:h-9 text-center appearance-none"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 sm:h-9 sm:w-9"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 sm:h-9 sm:w-9 text-red-500 hover:text-red-600"
                        onClick={() => updateQuantity(item.id, 0)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">{item.price * item.quantity} SEK</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex flex-col items-end gap-4 p-6 bg-slate-50 dark:bg-slate-800/50">
          <div className="w-full sm:w-1/2 md:w-1/3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{subtotal.toFixed(2)} SEK</span>
            </div>
            <div className="flex justify-between">
              <span>{t.vat}:</span>
              <span>{vatAmount.toFixed(2)} SEK</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>{t.total}:</span>
              <span>{cartTotal.toFixed(2)} SEK</span>
            </div>
          </div>
          <Button
            size="lg"
            onClick={() => setPage("checkout")}
            className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white"
          >
            {t.checkout} <Truck className="ml-2 h-5 w-5" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function CheckoutPage() {
  const { cart, setPage, t, setCart } = useAppContext()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [shippingOption, setShippingOption] = useState("standard")

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const vatAmount = subtotal * 0.25
  const shippingCost = shippingOption === "express" ? 149 : 79
  const grandTotal = subtotal + vatAmount + shippingCost

  const handlePayment = () => {
    // Simulate payment processing
    alert(`Simulating payment of ${grandTotal.toFixed(2)} SEK via ${paymentMethod}. Order confirmation will be shown.`)
    setCart([]) // Clear cart after "payment"
    setPage("confirmation")
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center">{t.checkout}</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>{t.billingShippingInfo}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Simplified form for demo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="checkout-name">{t.fullName}</Label>
                  <Input id="checkout-name" defaultValue="Test Testsson" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="checkout-email">{t.email}</Label>
                  <Input id="checkout-email" type="email" defaultValue="client@example.com" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="checkout-address">{t.address}</Label>
                <Input id="checkout-address" defaultValue="Storgatan 1" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="checkout-city">{t.city}</Label>
                  <Input id="checkout-city" defaultValue="Stockholm" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="checkout-postal">{t.postalCode}</Label>
                  <Input id="checkout-postal" defaultValue="111 22" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="checkout-country">{t.country}</Label>
                  <Input id="checkout-country" defaultValue="Sweden" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>{t.shippingOptions}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={shippingOption} onValueChange={setShippingOption} className="space-y-2">
                <Label
                  htmlFor="std-shipping"
                  className="flex items-center gap-2 p-3 border rounded-md has-[:checked]:border-sky-500 has-[:checked]:bg-sky-50 dark:has-[:checked]:bg-sky-900/30 cursor-pointer"
                >
                  <RadioGroupItem value="standard" id="std-shipping" /> {t.standardShipping} (79 SEK)
                </Label>
                <Label
                  htmlFor="exp-shipping"
                  className="flex items-center gap-2 p-3 border rounded-md has-[:checked]:border-sky-500 has-[:checked]:bg-sky-50 dark:has-[:checked]:bg-sky-900/30 cursor-pointer"
                >
                  <RadioGroupItem value="express" id="exp-shipping" /> {t.expressShipping} (149 SEK)
                </Label>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>{(item.price * item.quantity).toFixed(2)} SEK</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{subtotal.toFixed(2)} SEK</span>
              </div>
              <div className="flex justify-between">
                <span>{t.vat}:</span>
                <span>{vatAmount.toFixed(2)} SEK</span>
              </div>
              <div className="flex justify-between">
                <span>{t.shipping}:</span>
                <span>{shippingCost.toFixed(2)} SEK</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>{t.total}:</span>
                <span>{grandTotal.toFixed(2)} SEK</span>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>{t.paymentMethod}</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="card">
                    <CreditCard className="h-4 w-4 mr-1 sm:mr-2" />
                    Card
                  </TabsTrigger>
                  <TabsTrigger value="swish">
                    <SwatchBookIcon className="h-4 w-4 mr-1 sm:mr-2" />
                    Swish
                  </TabsTrigger>
                  <TabsTrigger value="klarna">
                    <KlarnaLogoIcon className="h-4 w-4 mr-1 sm:mr-2" />
                    Klarna
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="card" className="mt-4 text-sm">
                  Mock card payment form here...
                </TabsContent>
                <TabsContent value="swish" className="mt-4 text-sm">
                  Mock Swish instructions here...
                </TabsContent>
                <TabsContent value="klarna" className="mt-4 text-sm">
                  Mock Klarna options here...
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full bg-sky-600 hover:bg-sky-700 text-white" onClick={handlePayment}>
                <ShieldCheck className="mr-2 h-5 w-5" /> {t.payNow} ({grandTotal.toFixed(2)} SEK)
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

function OrderConfirmationPage() {
  const { setPage, t } = useAppContext()
  return (
    <div className="text-center py-12 md:py-20">
      <Card className="max-w-lg mx-auto shadow-xl bg-white dark:bg-slate-800">
        <CardHeader className="items-center">
          <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 mb-4">
            <ShieldCheck className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-3xl font-bold">{t.orderConfirmation}</CardTitle>
          <CardDescription className="text-lg">{t.thankYouForOrder}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-600 dark:text-slate-300">{t.orderSummaryEmail}</p>
          <div className="flex items-center justify-center gap-2 p-3 bg-slate-100 dark:bg-slate-700 rounded-md text-sm">
            <FileText className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            <span>PDF_Proof_Order_12345.pdf (Simulated)</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-sky-600 hover:bg-sky-700 text-white" onClick={() => setPage("home")}>
            {t.backToHome}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function DesignToolPage() {
  const { t } = useAppContext()
  const [uploadedImage, setUploadedImage] = useState(null)
  const [textValue, setTextValue] = useState("Your Text Here")
  const [selectedFont, setSelectedFont] = useState(fonts[0])
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [fontSize, setFontSize] = useState(32)
  const fileInputRef = useRef(null)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setUploadedImage(URL.createObjectURL(file))
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t.designTool}</h1>
      <div className="grid lg:grid-cols-[320px_1fr] gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              className="w-full bg-sky-600 hover:bg-sky-700 text-white"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" /> {t.uploadImage}
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/jpeg,image/png,image/svg+xml"
              className="hidden"
            />

            <Button
              variant="outline"
              className="w-full"
              onClick={() => alert("Simulating PDF/AI import onto template.")}
            >
              <FileImport className="mr-2 h-4 w-4" /> {t.importDesign}
            </Button>
            <Separator />

            <div>
              <h3 className="font-semibold mb-2">{t.textProperties}</h3>
              <Textarea
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                placeholder="Enter text"
                className="mb-2"
              />
              <div className="grid grid-cols-2 gap-2">
                <Select value={selectedFont} onValueChange={setSelectedFont}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.font} />
                  </SelectTrigger>
                  <SelectContent>
                    {fonts.map((f) => (
                      <SelectItem key={f} value={f} style={{ fontFamily: f }}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number.parseInt(e.target.value))}
                  placeholder={t.size}
                  className="w-full"
                />
              </div>
              <div className="flex gap-1 mt-2 flex-wrap">
                {colors.map((c) => (
                  <Button
                    key={c}
                    size="icon"
                    style={{ backgroundColor: c }}
                    className="h-6 w-6 border"
                    onClick={() => setSelectedColor(c)}
                  />
                ))}
              </div>
            </div>
            <Separator />

            <div>
              <h3 className="font-semibold mb-2">{t.imageProperties}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                {t.dragResizeRotate} (Controls simulated)
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" title="Drag">
                  <Move className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" title="Resize">
                  <Maximize className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" title="Rotate">
                  <RotateCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Separator />

            <div className="space-y-2">
              <h3 className="font-semibold">{t.previewExport}</h3>
              <Button variant="outline" className="w-full" onClick={() => alert("Simulating PNG download.")}>
                <Download className="mr-2 h-4 w-4" /> {t.downloadPNG}
              </Button>
              <Button variant="outline" className="w-full" onClick={() => alert("Simulating PDF download.")}>
                <Download className="mr-2 h-4 w-4" /> {t.downloadPDF}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg flex items-center justify-center bg-slate-100 dark:bg-slate-800 aspect-[4/3] p-4 relative overflow-hidden">
          <div className="absolute inset-0 border-2 border-dashed border-slate-300 dark:border-slate-600 m-2 rounded-md"></div>
          {uploadedImage && (
            <Image
              src={uploadedImage || "/placeholder.svg"}
              alt="Uploaded design"
              layout="fill"
              objectFit="contain"
              className="p-4"
            />
          )}
          <div
            className="absolute select-none pointer-events-none"
            style={{ fontFamily: selectedFont, color: selectedColor, fontSize: `${fontSize}px` }}
          >
            {textValue}
          </div>
          {!uploadedImage && !textValue && <p className="text-slate-400 dark:text-slate-500">{t.canvasArea}</p>}
        </Card>
      </div>
    </div>
  )
}

function CarMockupPage() {
  const { t, uploadedDesignForCar, setUploadedDesignForCar } = useAppContext()
  const [plate, setPlate] = useState("")
  const [vehicle, setVehicle] = useState(null)
  const [selectedDesign, setSelectedDesign] = useState(null)
  const carDesignUploadRef = useRef(null)

  const handleFindVehicle = () => {
    const found = carDatabase[plate.toUpperCase().replace(/\s/g, "")]
    setVehicle(found || { error: "Vehicle not found or invalid plate." })
  }

  const handleCarDesignUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const designUrl = URL.createObjectURL(file)
      setUploadedDesignForCar(designUrl) // Store in context if needed across sessions/pages
      setSelectedDesign(designUrl) // For immediate display
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t.carWrapDesigner}</h1>
      <div className="grid lg:grid-cols-[320px_1fr] gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Vehicle & Design</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="license-plate">{t.enterLicensePlate}</Label>
              <div className="flex gap-2">
                <Input
                  id="license-plate"
                  placeholder="ABC 123"
                  value={plate}
                  onChange={(e) => setPlate(e.target.value)}
                />
                <Button onClick={handleFindVehicle} className="bg-sky-600 hover:bg-sky-700 text-white">
                  {t.findVehicle}
                </Button>
              </div>
              {vehicle?.error && <p className="text-sm text-red-500 dark:text-red-400">{vehicle.error}</p>}
              {vehicle && !vehicle.error && (
                <p className="text-sm text-green-600 dark:text-green-400">
                  Found: {vehicle.make} {vehicle.model}
                </p>
              )}
            </div>
            <Separator />
            <div className="space-y-1">
              <Label>{t.applyDesignToWrap}</Label>
              <Button className="w-full" variant="outline" onClick={() => carDesignUploadRef.current?.click()}>
                <Upload className="mr-2 h-4 w-4" /> {t.uploadImage}
              </Button>
              <input
                type="file"
                ref={carDesignUploadRef}
                onChange={handleCarDesignUpload}
                accept="image/jpeg,image/png,image/svg+xml"
                className="hidden"
              />
              {selectedDesign && (
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">Image selected for mockup.</p>
              )}
            </div>
            <Separator />
            <Button className="w-full" onClick={() => alert("Simulating download of car wrap mockup.")}>
              <Download className="mr-2 h-4 w-4" /> {t.previewExport}
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg flex items-center justify-center bg-slate-100 dark:bg-slate-800 aspect-video p-4 relative overflow-hidden">
          {vehicle && vehicle.svgPath ? (
            <>
              <Image
                src={vehicle.svgPath || "/placeholder.svg"}
                layout="fill"
                objectFit="contain"
                alt={`${vehicle.make} ${vehicle.model} outline`}
              />
              {selectedDesign && (
                <Image
                  src={selectedDesign || "/placeholder.svg"}
                  layout="fill"
                  objectFit="contain"
                  alt="Applied Design"
                  className="opacity-70 p-8"
                />
              )}
              {/* Bleed Guidelines */}
              <div className="absolute inset-2 border-2 border-dashed border-red-500 pointer-events-none">
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-red-500 text-white px-1 text-xs rounded-sm">
                  {t.bleedGuidelines}
                </span>
              </div>
            </>
          ) : (
            <p className="text-slate-400 dark:text-slate-500">{t.vehicleMockup}</p>
          )}
        </Card>
      </div>
    </div>
  )
}
