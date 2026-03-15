import type { PizzaFormValues } from '@/schema/config.zod'
import { pizzaSchema } from '@/schema/config.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { PropsWithChildren, RefObject } from 'react'
import { useForm, useWatch } from 'react-hook-form'

type ContextType = {
  form: ReturnType<typeof useForm<PizzaFormValues>>
  isPizzaVisible: boolean
  sideScale: number
  runBoxAnimationRef: RefObject<() => void>
  runPlatingAnimationRef: RefObject<() => void>
  runPlateAnimationRef: RefObject<() => void>
  setCameraPositionRef: RefObject<
    (params: { x: number; y: number; z: number; fov: number }) => void
  >
  isOrderDialogOpen: boolean
  isFormDisabled: boolean
  areControllsEnabled: boolean
  onSubmit: (data: PizzaFormValues) => void
  showOrderDialog: () => void
  enableForm: () => void
  disableForm: () => void
}
const initialContextData: ContextType = {
  form: undefined as any,
  isPizzaVisible: false,
  sideScale: 1,
  runPlatingAnimationRef: { current: () => {} },
  runBoxAnimationRef: { current: () => {} },
  runPlateAnimationRef: { current: () => {} },
  setCameraPositionRef: { current: () => {} },
  isOrderDialogOpen: false,
  isFormDisabled: true,
  areControllsEnabled: false,
  onSubmit: () => {},
  showOrderDialog: () => {},
  enableForm: () => {},
  disableForm: () => {},
}
const ConfigContext = createContext<ContextType>(initialContextData)

export const ConfigProvider = ({ children }: PropsWithChildren) => {
  const [isPizzaVisible, setIsPizzaVisible] = useState(true)
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false)
  const [isFormDisabled, setIsFormDisabled] = useState(true)
  const [areControllsEnabled, setAreControllsEnabled] = useState(true)
  const form = useForm<PizzaFormValues>({
    resolver: zodResolver(pizzaSchema),
    defaultValues: {
      size: 'medium',
      crust: 'regular',
      toppings: [],
      delivery: 'pickup',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
    },
  })
  const size = useWatch({
    control: form.control,
    name: 'size',
  })
  const sideScale = size === 'small' ? 0.85 : size === 'large' ? 1.15 : 1
  const runBoxAnimationRef = useRef(() => {})
  const runPlatingAnimationRef = useRef(() => {})
  const runPlateAnimationRef = useRef(() => {})
  const setCameraPositionRef = useRef(
    (_params: { x: number; y: number; z: number; fov: number }) => {},
  )

  const onSubmit = useCallback((data: PizzaFormValues) => {
    setAreControllsEnabled(false)
    if (data.delivery === 'delivery') {
      setCameraPositionRef.current({ x: 0, y: 0.315, z: -0.315, fov: 90 })
      runBoxAnimationRef.current()
      runPlatingAnimationRef.current()
      setTimeout(() => {
        setIsPizzaVisible(false)
      }, 1100)
      return
    }
    setCameraPositionRef.current({ x: 0, y: 0.415, z: -0.215, fov: 50 })
    runPlatingAnimationRef.current()
    runPlateAnimationRef.current()
  }, [])

  const showOrderDialog = useCallback(() => {
    setIsOrderDialogOpen(true)
  }, [])
  const enableForm = useCallback(() => {
    setIsFormDisabled(false)
  }, [])
  const disableForm = useCallback(() => {
    setIsFormDisabled(true)
  }, [])

  return (
    <ConfigContext.Provider
      value={useMemo(
        () => ({
          form,
          sideScale,
          runBoxAnimationRef,
          runPlatingAnimationRef,
          runPlateAnimationRef,
          setCameraPositionRef,
          isPizzaVisible,
          isOrderDialogOpen,
          isFormDisabled,
          areControllsEnabled,
          showOrderDialog,
          enableForm,
          disableForm,
          onSubmit,
        }),
        [
          form,
          sideScale,
          runBoxAnimationRef,
          runPlatingAnimationRef,
          runPlateAnimationRef,
          isPizzaVisible,
          isOrderDialogOpen,
          isFormDisabled,
          areControllsEnabled,
          showOrderDialog,
          onSubmit,
          enableForm,
          disableForm,
        ],
      )}
    >
      {children}
    </ConfigContext.Provider>
  )
}

export const useConfig = () => {
  const ctx = useContext(ConfigContext)
  // eslint-disable-next-line
  if (!ctx) {
    throw new Error('useConfig must be used within a ConfigProvider')
  }
  return ctx
}
