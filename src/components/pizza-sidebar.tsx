import { Controller, useWatch } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useConfig } from './provider/config-provider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Field, FieldError, FieldLabel } from './ui/field'
import { Input } from './ui/input'
import ChiliIcon from '@/assets/icons/chili.svg?react'
import CornIcon from '@/assets/icons/corn.svg?react'
import MushroomIcon from '@/assets/icons/mushroom.svg?react'
import OliveIcon from '@/assets/icons/olive.svg?react'
import PineappleIcon from '@/assets/icons/pineapple.svg?react'
import SalamiIcon from '@/assets/icons/salami.svg?react'
import { OptionButton } from './ui/option-button'

const SIZES = [
  { id: 'small', label: 'Small', info: '10"', price: '$8.99' },
  { id: 'medium', label: 'Medium', info: '12"', price: '$11.99' },
  { id: 'large', label: 'Large', info: '14"', price: '$14.99' },
]

const CRUSTS = [
  { id: 'regular', label: 'Regular' },
  { id: 'stuffed', label: 'Stuffed Crust', upcharge: '+$2.99' },
]

const SAUCES = [
  { id: 'tomato', label: 'Tomato' },
  { id: 'sour-cream', label: 'Sour Cream' },
]

const CHEESES = [
  { id: 'none', label: 'No Cheese' },
  { id: 'mozzarella', label: 'Mozzarella', upcharge: '+$1.00' },
  { id: 'blue-cheese', label: 'Blue Cheese', upcharge: '+$1.00' },
]

const TOPPINGS = [
  { id: 'mushrooms', label: 'Mushrooms', icon: MushroomIcon, price: '+$1.00' },
  { id: 'olives', label: 'Olives', icon: OliveIcon, price: '+$1.00' },
  { id: 'pineapple', label: 'Pineapple', icon: PineappleIcon, price: '+$1.25' },
  { id: 'salami', label: 'Salami', icon: SalamiIcon, price: '+$1.75' },
  { id: 'corn', label: 'Corn', icon: CornIcon, price: '+$0.75' },
  { id: 'chili', label: 'Chili', icon: ChiliIcon, price: '+$0.75' },
]

export function PizzaSidebar() {
  const { form, onSubmit, isFormDisabled, disableForm } = useConfig()
  const [sauce, cheese] = useWatch({
    control: form.control,
    name: ['sauce', 'cheese'],
  })

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="h-screen w-md absolute top-0 right-0 shadow-xl rounded-l-2xl bg-white flex flex-col"
    >
      <div className="px-5 pt-5 pb-3 shrink-0">
        <h2 className="text-lg font-bold tracking-tight">
          Customize Your Pizza
        </h2>
      </div>
      <ScrollArea className="flex-1 min-h-0">
        <div className="px-5 pb-4 flex flex-col gap-5">
          <section className="flex flex-col gap-2">
            <h3 className="section-heading">Choose Size</h3>
            <Controller
              name="size"
              control={form.control}
              render={({ field }) => (
                <div className="grid grid-cols-3 gap-2">
                  {SIZES.map((s) => (
                    <OptionButton
                      key={s.id}
                      selected={field.value === s.id}
                      onClick={() => field.onChange(s.id)}
                      className="flex flex-col items-center py-2.5 px-2 gap-0.5"
                    >
                      <span className="text-sm font-medium">{s.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {s.info}
                      </span>
                      <span className="text-xs font-medium text-primary">
                        {s.price}
                      </span>
                    </OptionButton>
                  ))}
                </div>
              )}
            />
          </section>

          {/* Crust */}
          <section className="flex flex-col gap-2">
            <h3 className="section-heading">Choose Crust</h3>
            <Controller
              name="crust"
              control={form.control}
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-2">
                  {CRUSTS.map((c) => (
                    <OptionButton
                      key={c.id}
                      selected={field.value === c.id}
                      onClick={() => {
                        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                        if (!sauce) {
                          disableForm()
                        }
                        field.onChange(c.id)
                      }}
                      className="flex items-center justify-between px-3 py-2.5"
                    >
                      <span className="text-sm font-medium">{c.label}</span>
                      {c.upcharge && (
                        <span className="text-xs font-medium text-primary">
                          {c.upcharge}
                        </span>
                      )}
                    </OptionButton>
                  ))}
                </div>
              )}
            />
          </section>

          {/* Sauce */}
          <section className="flex flex-col gap-2">
            <h3 className="section-heading">Choose Sauce</h3>
            <Controller
              name="sauce"
              control={form.control}
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-2">
                  {SAUCES.map((s) => (
                    <OptionButton
                      disabled={isFormDisabled}
                      key={s.id}
                      selected={field.value === s.id}
                      onClick={() => field.onChange(s.id)}
                      className="flex items-center gap-2 px-3 py-2.5"
                    >
                      <span className="text-sm font-medium">{s.label}</span>
                    </OptionButton>
                  ))}
                </div>
              )}
            />
          </section>

          {/* Cheese */}
          {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
          {sauce && (
            <section className="flex flex-col gap-2">
              <h3 className="section-heading">Choose Cheese</h3>
              <Controller
                name="cheese"
                control={form.control}
                render={({ field }) => (
                  <div className="grid grid-cols-2 gap-2">
                    {CHEESES.map((s) => (
                      <OptionButton
                        key={s.id}
                        selected={field.value === s.id}
                        onClick={() => field.onChange(s.id)}
                        className="flex items-center gap-2 px-3 py-2.5"
                      >
                        <span className="text-sm font-medium">{s.label}</span>
                      </OptionButton>
                    ))}
                  </div>
                )}
              />
            </section>
          )}

          {/* Toppings */}
          {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
          {cheese && (
            <>
              <section className="flex flex-col gap-2">
                <h3 className="section-heading">Choose Toppings</h3>
                <Controller
                  name="toppings"
                  control={form.control}
                  render={({ field }) => (
                    <div className="grid grid-cols-2 gap-2">
                      {TOPPINGS.map((t) => {
                        // @ts-expect-error - value is string[] but type defs are a bit off for multi-select
                        const isSelected = field.value?.includes(t.id)
                        const IconComp = t.icon
                        return (
                          <OptionButton
                            key={t.id}
                            selected={!!isSelected}
                            onClick={() => {
                              if (isSelected) {
                                // @ts-expect-error - value is string[] but type defs are a bit off for multi-select
                                const newValue = [...field.value]
                                newValue.splice(newValue.indexOf(t.id), 1)
                                return field.onChange(newValue)
                              }
                              field.onChange([...(field.value || []), t.id])
                            }}
                            className="flex items-center justify-between px-3 py-2.5"
                          >
                            <span className="flex items-center gap-1.5">
                              <IconComp className="size-5" />
                              <span className="text-xs font-medium">
                                {t.label}
                              </span>
                            </span>
                            <span className="text-xs font-medium text-primary">
                              {t.price}
                            </span>
                          </OptionButton>
                        )
                      })}
                    </div>
                  )}
                />
              </section>
              <section className="flex flex-col gap-2">
                <div className="pt-5 pb-3 shrink-0">
                  <h2 className="text-lg font-bold tracking-tight">
                    Delivery Details
                  </h2>
                </div>
                <h3 className="section-heading">Delivery or Pickup?</h3>
                <Controller
                  name="delivery"
                  control={form.control}
                  render={({ field }) => (
                    <Tabs value={field.value} onValueChange={field.onChange}>
                      <TabsList className="w-full">
                        <TabsTrigger value="pickup">Pickup</TabsTrigger>
                        <TabsTrigger value="delivery">Delivery</TabsTrigger>
                      </TabsList>
                      <div className="flex flex-row gap-4">
                        <Controller
                          name="firstName"
                          control={form.control}
                          render={({ field: firstNameField, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={firstNameField.name}>
                                First Name
                              </FieldLabel>
                              <Input
                                placeholder="Doe"
                                id={firstNameField.name}
                                aria-invalid={fieldState.invalid}
                                {...firstNameField}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                        <Controller
                          name="lastName"
                          control={form.control}
                          render={({ field: lastNameField, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={lastNameField.name}>
                                Last Name
                              </FieldLabel>
                              <Input
                                placeholder="Doe"
                                id={lastNameField.name}
                                aria-invalid={fieldState.invalid}
                                {...lastNameField}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </div>
                      <Controller
                        name="phoneNumber"
                        control={form.control}
                        render={({ field: phoneNumberField, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={phoneNumberField.name}>
                              Phone Number
                            </FieldLabel>
                            <Input
                              placeholder="+420 123 456 789"
                              id={phoneNumberField.name}
                              aria-invalid={fieldState.invalid}
                              {...phoneNumberField}
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                      <TabsContent value="delivery">
                        <Controller
                          name="address"
                          control={form.control}
                          render={({ field: addressField, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={addressField.name}>
                                Address
                              </FieldLabel>
                              <Input
                                placeholder="123 Main St, City, Country"
                                id={addressField.name}
                                aria-invalid={fieldState.invalid}
                                {...addressField}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </TabsContent>
                    </Tabs>
                  )}
                />
              </section>
            </>
          )}
        </div>
      </ScrollArea>
      <div className="px-5 py-4 shrink-0 border-t">
        <Button
          type="submit"
          className="w-full"
          disabled={
            !cheese || isFormDisabled || form.formState.isSubmitSuccessful
          }
        >
          Place Order
        </Button>
      </div>
    </form>
  )
}
