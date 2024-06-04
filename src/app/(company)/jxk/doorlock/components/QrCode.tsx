'use client'
import { useQuery } from '@tanstack/react-query'
import { QRCodeSVG } from 'qrcode.react'
import type { QRProps } from 'antd/es/qr-code/interface'
import { clientApi } from '@/services/kkservice/api.client'

interface QrCodeProps extends Partial<QRProps> {
  code: string
}

export default function QrCode(props: QrCodeProps) {
  const { code, value, ...rest } = props
  const { data, refetch } = useQuery<{ result: string }>({
    queryKey: ['/jxk/doorlock'],
    queryFn: clientApi.getJxkDoorLock as any,
    initialData: { result: code },
  })

  return <QRCodeSVG {...rest} value={data.result} onClick={() => refetch()} />
}
