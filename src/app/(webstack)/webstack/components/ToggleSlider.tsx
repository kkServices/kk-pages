export function ToggleSlider({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={() => {
        onClick()
        // setOpen(!open)
      }}
      className="flex size-16 cursor-pointer items-center justify-center border-t border-t-transparent hover:border-t-primary"
    >
      <span className="icon-[fa6-solid--align-justify]"></span>
    </div>
  )
}
