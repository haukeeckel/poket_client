function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function StrengthPW({ check }) {
  let classStr = classNames(
    'inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium',
    check.color,
    check.colorText
  );
  return (
    <>
      <span className={classStr}>{check.text ? check.text : 'week'}</span>
    </>
  );
}

export default StrengthPW;
