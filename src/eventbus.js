var eventbusState = {};

(function() {

    var handlers = {};

    eventbusState.publish = function(eventId) {
      if(handlers[eventId]) {
        handlers[eventId].func.apply(handlers[eventId].thisRef, Array.prototype.slice.call(arguments, 1));
      } else {
        console.warn('No handler for ' + eventId);
      }
    }
    eventbusState.on = function(tr, id, fn) {
      handlers[id] = { thisRef: tr, func: fn};
      console.log(handlers);
    }

    module.exports.publish = eventbusState.publish;
    module.exports.on = eventbusState.on;

})();
