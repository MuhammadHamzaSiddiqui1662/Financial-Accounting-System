import styled from '@emotion/styled';

export default styled.div({}, ({ ds, jc, ai, fd, w, h, bg, color }) => ({
  display: ds || 'flex',
  justifyContent: jc || 'center',
  alignItems: ai || 'center',
  flexDirection: fd || 'row',
  width: w || "100%",
  height: h,
  background: bg,
  color: color
}))