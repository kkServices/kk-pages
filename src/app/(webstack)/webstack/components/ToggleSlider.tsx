export function ToggleSlider({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={() => {
        onClick()
        // setOpen(!open)
      }}
      className="flex size-16 cursor-pointer items-center justify-center border-t-primary hover:border-t"
    >
      <span className="icon-[fa6-solid--align-justify]"></span>
    </div>
  )
}
