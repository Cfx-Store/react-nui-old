---@param action string
---@param data any
function SendNuiAction(action, data)
  SendNUIMessage({
    action = action,
    data = data
  })
end

---@param visible boolean
local function setVisibility(visible)
  SetNuiFocus(visible, visible)
  SendNuiAction("setVisibility", visible)
end

RegisterCommand("react", function()
  setVisibility(true);
end, true)

RegisterNUICallback("hide", function(_, cb)
  setVisibility(false)
  cb({})
end)
