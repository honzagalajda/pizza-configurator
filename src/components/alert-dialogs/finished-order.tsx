import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog'
import { useConfig } from '../provider/config-provider'
import { useMemo } from 'react'

const labels: Record<string, string> = {
  small: 'Small',
  medium: 'Medium',
  large: 'Large',
  regular: 'Regular',
  stuffed: 'Stuffed',
  tomato: 'Tomato',
  'sour-cream': 'Sour Cream',
  none: 'None',
  mozzarella: 'Mozzarella',
  'blue-cheese': 'Blue Cheese',
  pickup: 'Pickup',
  delivery: 'Delivery',
}

export function FinishedOrderAlertDialog() {
  const { isOrderDialogOpen, form } = useConfig()
  const order = useMemo(() => {
    if (!isOrderDialogOpen) {
      return null
    }
    return form.getValues()
  }, [isOrderDialogOpen])
  if (!order) return null

  const handleAnotherOrder = () => {
    window.location.reload()
  }

  const toppings = order.toppings?.length
    ? order.toppings
        .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
        .join(', ')
    : 'None'

  return (
    <AlertDialog open={isOrderDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl text-center w-full">
            Order placed successfully! 🎉
          </AlertDialogTitle>
          <AlertDialogDescription className='w-full'>
            <div className="space-y-3 text-sm text-foreground">
              <p className="text-muted-foreground text-center">
                Hey {order.firstName}, your pizza is on its way!
              </p>
              <div className="rounded-lg border p-3 space-y-1.5">
                <Row label="Size" value={labels[order.size]} />
                <Row label="Crust" value={labels[order.crust]} />
                <Row label="Sauce" value={labels[order.sauce]} />
                <Row label="Cheese" value={labels[order.cheese]} />
                <Row label="Toppings" value={toppings} />
              </div>
              <div className="rounded-lg border p-3 space-y-1.5">
                <Row
                  label="Name"
                  value={`${order.firstName} ${order.lastName}`}
                />
                <Row label="Phone" value={order.phoneNumber} />
                <Row label="Delivery" value={labels[order.delivery]} />
                {order.delivery === 'delivery' && order.address && (
                  <Row label="Address" value={order.address} />
                )}
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleAnotherOrder} className='w-full'>
            Place Another Order
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  )
}
