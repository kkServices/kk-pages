import { ChevronRightIcon, EnvelopeOpenIcon, ReloadIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { ModeToggle } from '@/components/business/mode-toggle'
import { CardDemo } from '@/components/test/CardDemo'
import { CardWithForm } from '@/components/test/CardWithForm'
import { Button } from '@/components/ui/button'
import { SkeletonDemo } from '@/components/test/SkeletonCard'
import { TabsDemo } from '@/components/test/TabsDemo'

export default function TestPage() {
  return (
    <div>
      <div className="text-blue">asdsd</div>

      <ModeToggle />
      <div className="flex flex-wrap gap-4">
        <Button>Button</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
        <Button variant="outline">按钮 outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="outline" size="icon">
          <ChevronRightIcon className="size-4" />
        </Button>
        <Button>
          <EnvelopeOpenIcon className="mr-2 size-4" />
          {' '}
          Login with Email
        </Button>
        <Button disabled>
          <ReloadIcon className="mr-2 size-4 animate-spin" />
          Please wait
        </Button>

        <Button asChild>
          <Link href="#">Login</Link>
        </Button>

      </div>
      <div className="mt-2 flex gap-4">

        <CardWithForm />
        <CardDemo />
        <SkeletonDemo />
        <TabsDemo />
      </div>

      <div className="mt-2 flex gap-4">

      </div>
    </div>
  )
}
